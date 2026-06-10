# PagePilot: AI Powered PDF chat bot

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2.svg?logo=google&logoColor=white)

**Chat with your PDF documents using a modern full-stack RAG pipeline.**

</div>

---

##  About the Project

**PagePilot** is an advanced **Retrieval-Augmented Generation (RAG)** application that lets you have a natural conversation with any PDF document. 

Originally built as a single-script application, PagePilot has been re-architected into a robust, decoupled full-stack application. It features a highly responsive **Next.js/React frontend** managed by **Redux**, communicating with a **Python REST API backend**. 

The ML architecture uses open-source models for local text embeddings (ensuring privacy and zero embedding costs) and **Google Gemini 2.5 Flash Lite** for fast, accurate, and context-grounded response generation.

---

## 🛠️ Tech Stack

### Frontend (Client UI)
| Technology | Description | Why We Chose It |
|---|---|---|
| **Next.js & React** | UI framework & component library | Fast rendering (SSR) and seamless component reusability. |
| **Redux Toolkit** | Global state management | Predictable handling of chat history and async loading states. |
| **Tailwind CSS** | Utility-first CSS framework | Rapid, responsive, and consistent UI styling. |
| **Axios** | HTTP client | Reliable REST API communication with built-in interceptors. |

### Backend (REST API & Machine Learning)
| Technology | Description | Why We Chose It |
|---|---|---|
| **FastAPI / Flask** | Python web server | High performance and native async support for AI tasks. |
| **LangChain** | LLM & RAG orchestration | Simplifies document chunking, embeddings, and chat memory. |
| **Gemini API** | Generative LLM (`flash-lite`) | Extremely fast, low-latency, and cost-effective responses. |
| **Hugging Face** | Local embeddings (`MiniLM`) | Generates semantic embeddings locally for free. |
| **FAISS** | In-memory vector database | fast similarity search for retrieving document context. |
| **PyPDF2** | Document parsing | Lightweight and reliable text extraction from uploaded PDFs. |
---

##  Key Features

* **Decoupled Architecture:** Clean separation of concerns between the React user interface and the Python machine learning logic.
* **Intelligent Document Parsing:** Chunks documents by paragraphs and sentences, preserving semantic meaning.
* **Local Vector Embeddings:** Runs `all-MiniLM-L6-v2` entirely on your machine—no paid embedding API needed.
* **Hallucination Mitigation:** Gemini is strictly prompted to answer *only* from retrieved context. Returns a fallback if the answer isn't in the PDF.

---

