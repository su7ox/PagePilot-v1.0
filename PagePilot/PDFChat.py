from dotenv import load_dotenv
import os
import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
import google.generativeai as genai

# 1. Load the secret Gemini API Key from your .env file
load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")
genai.configure(api_key=GEMINI_API)

def main():
    st.set_page_config(page_title="PagePilot", page_icon="📄")
    st.header("PagePilot: Chat with your PDF 💬")

    # Upload the PDF
    pdf = st.file_uploader("Upload your PDF here", type="pdf")

    if pdf is not None:
        # 2. Extract Text from the PDF
        pdf_reader = PdfReader(pdf)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # 3. Split Text into smaller Chunks intelligently
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
            separators=["\n\n", "\n", ".", " ", ""] 
        )
        chunks = text_splitter.split_text(text)

        # 4. Create free local embeddings (The Math Brain)
        # This downloads a highly efficient ML model directly to your machine
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        # Store those numbers in the FAISS database
        knowledge_base = FAISS.from_texts(chunks, embeddings)

        # 5. Get User Question
        user_question = st.text_input("Ask a question about your PDF:")

        if user_question:
            # 6. RAG RETRIEVAL: Search the database for the 3 most relevant chunks
            docs = knowledge_base.similarity_search(user_question, k=3)
            
            # Extract just the raw text from those found chunks
            context = ""
            for doc in docs:
                context += doc.page_content + "\n\n"

            # 7. RAG AUGMENTATION: Build a giant prompt for Gemini
            prompt = f"""
            You are a helpful AI assistant. Answer the user's question using ONLY the provided text from their PDF document.
            If the answer is not in the text, politely say "I cannot find the answer in the provided document."

            Context from PDF:
            {context}

            User Question:
            {user_question}
            """
<<<<<<< HEAD
            with st.expander("🕵️‍♂️ Click here to see the exact data sent to the API (Proof of RAG)"):
                st.text(prompt)
                
=======
            
>>>>>>> 9d3f538c47585bb8cc75c008e04857a14cbd826a
            # 8. RAG GENERATION: Send the augmented prompt to Gemini (The Talking Brain)
            model = genai.GenerativeModel("gemini-2.5-flash-lite")
            response = model.generate_content(prompt)
            
            # Print the final answer to the screen!
            st.write(response.text)

if __name__ == '__main__':
    main()