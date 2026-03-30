# 🧠 Smart PDF Reader: RAG-Powered AI Assistant

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B.svg?logo=streamlit&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2.svg?logo=google&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E.svg?logo=huggingface&logoColor=black)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C.svg?logo=langchain&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Chat with your PDF documents using a local-first, privacy-respecting RAG pipeline.**

</div>

---

## 📌 About the Project

**Smart PDF Reader** is an advanced **Retrieval-Augmented Generation (RAG)** application that lets you have a natural conversation with any PDF document.

Unlike basic API wrappers, this project uses a **hybrid ML architecture**: text embeddings run entirely on your local machine using open-source models (ensuring privacy and zero embedding costs), while **Google Gemini 2.5 Flash Lite** handles fast, accurate response generation — strictly grounded in the content of your document.

---

## ✨ Key Features & ML Architecture

| Feature | Details |
|---|---|
| 📄 **Intelligent Document Parsing** | Uses `RecursiveCharacterTextSplitter` to chunk documents by paragraphs and sentences, preserving semantic meaning |
| 🔒 **Local Vector Embeddings** | Runs `all-MiniLM-L6-v2` (Hugging Face) entirely on your machine — no paid embedding API needed |
| ⚡ **In-Memory Vector Search** | `FAISS` (Facebook AI Similarity Search) retrieves the most relevant chunks instantly |
| 🧱 **Hallucination Mitigation** | Gemini is strictly prompted to answer *only* from retrieved context — returns a fallback if the answer isn't in the PDF |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend UI** | [Streamlit](https://streamlit.io/) |
| **Orchestration** | [LangChain](https://www.langchain.com/) |
| **Generative LLM** | Google Gemini 2.5 Flash Lite (`google-generativeai`) |
| **Embedding Model** | `sentence-transformers` — `all-MiniLM-L6-v2` (Hugging Face) |
| **Vector Database** | FAISS (`faiss-cpu`) |
| **Document Processing** | PyPDF2 |

---

## 🚀 Local Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/su7ox/smart-pdf-reader.git
cd smart-pdf-reader/DocGenius
```

### 2. Create a Virtual Environment *(Recommended)*

Isolate your dependencies to avoid version conflicts.

```bash
python -m venv myenv

# Activate on Windows:
myenv\Scripts\activate

# Activate on Mac/Linux:
source myenv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> ⚠️ **Note:** On first run, the `all-MiniLM-L6-v2` embedding model will be downloaded from Hugging Face (~90 MB). This only happens once.

### 4. Configure Environment Variables

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a `.env` file inside the `DocGenius/` directory.
3. Add your key:

```env
GEMINI_API="your_secret_api_key_here"
```

### 5. Run the Application

```bash
streamlit run PDFChat.py
```

---

## 💡 How to Use

1. Open the local URL shown in your terminal (usually `http://localhost:8501`)
2. **Upload** any PDF using the drag-and-drop interface
3. Wait a few seconds while the document is **parsed → chunked → embedded** into FAISS
4. **Ask questions** in the chat box — the AI retrieves relevant paragraphs and generates a grounded, accurate answer

---

## 🗂️ Project Structure

```
smart-pdf-reader/
└── PagePilot/
    ├── PDFChat.py          # Main Streamlit application
    ├── requirements.txt    # Python dependencies
    └── .env                # Your API key (not committed to Git)
```

---

## 🔐 Privacy & Cost

- **Embeddings are 100% local** — your document content never leaves your machine during vectorization
- **No embedding API costs** — the open-source `all-MiniLM-L6-v2` model runs free on CPU
- Only the retrieved text *chunks* (not the full PDF) are sent to the Gemini API for answer generation

---



<div align="center">
</div>
