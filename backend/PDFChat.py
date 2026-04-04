from dotenv import load_dotenv
import os
import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
import google.generativeai as genai

# 1. Load API Key
load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")
genai.configure(api_key=GEMINI_API)

def main():
    # Set app to use the full width of the screen
    st.set_page_config(page_title="PagePilot", page_icon="📄", layout="wide")
    
    # --- SESSION STATE INITIALIZATION ---
    # Create memory for the chat history
    if "messages" not in st.session_state:
        st.session_state.messages = []
        
    # Create memory for the parsed PDF so we don't re-read it on every message
    if "knowledge_base" not in st.session_state:
        st.session_state.knowledge_base = None

    # --- SIDEBAR UI (Setup & Upload) ---
    with st.sidebar:
        st.title("📄 PagePilot Setup")
        st.write("Upload your document here to start chatting.")
        pdf = st.file_uploader("Upload your PDF", type="pdf")
        
        # Only process the PDF if it's uploaded AND we haven't processed it yet
        if pdf is not None and st.session_state.knowledge_base is None:
            with st.spinner("Analyzing document and building local vectors..."):
                # Extract Text
                pdf_reader = PdfReader(pdf)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text()

                # Chunk Text
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=1000,
                    chunk_overlap=200,
                    length_function=len,
                    separators=["\n\n", "\n", ".", " ", ""] 
                )
                chunks = text_splitter.split_text(text)

                # Embed and Store in FAISS, then save to session state!
                embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
                st.session_state.knowledge_base = FAISS.from_texts(chunks, embeddings)
                
            st.success("PDF Processed! You can now chat.")

    # --- MAIN CHAT UI ---
    st.header("PagePilot: Chat with your PDF 💬")

    # Display all previous chat messages from memory
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # Chat Input Box at the bottom of the screen
    if user_question := st.chat_input("Ask a question about your PDF..."):
        
        # 1. Instantly display the user's question in a chat bubble
        with st.chat_message("user"):
            st.markdown(user_question)
        
        # 2. Add the user's question to the memory history
        st.session_state.messages.append({"role": "user", "content": user_question})

        # 3. Generate the AI Response
        if st.session_state.knowledge_base is not None:
            with st.chat_message("assistant"):
                with st.spinner("Searching document..."):
                    # Retrieve matching chunks
                    docs = st.session_state.knowledge_base.similarity_search(user_question, k=3)
                    
                    context = ""
                    for doc in docs:
                        context += doc.page_content + "\n\n"

                    # Build Prompt
                    prompt = f"""
                    You are a helpful AI assistant. Answer the user's question using ONLY the provided text from their PDF document.
                    If the answer is not in the text, politely say "I cannot find the answer in the provided document."

                    Context from PDF:
                    {context}

                    User Question:
                    {user_question}
                    """
                    
                    # Call Gemini
                    model = genai.GenerativeModel("gemini-2.5-flash-lite")
                    response = model.generate_content(prompt)
                    
                    # Display the final answer in the AI chat bubble
                    st.markdown(response.text)
                    
                    # Add our RAG proof dropdown below the answer
                    with st.expander("🕵️‍♂️ View the exact data sent to the API (Proof of RAG)"):
                        st.text(prompt)
                        
            # 4. Save the AI's answer to the memory history
            st.session_state.messages.append({"role": "assistant", "content": response.text})
            
        else:
            st.error("Please upload a PDF in the sidebar first!")

if __name__ == '__main__':
    main()