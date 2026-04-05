# 🧠 PagePilot: RAG-Powered AI Assistant

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

## 📌 About the Project

**PagePilot** is an advanced **Retrieval-Augmented Generation (RAG)** application that lets you have a natural conversation with any PDF document. 

Originally built as a single-script application, PagePilot has been re-architected into a robust, decoupled full-stack application. It features a highly responsive **Next.js/React frontend** managed by **Redux**, communicating with a **Python REST API backend**. 

The ML architecture uses open-source models for local text embeddings (ensuring privacy and zero embedding costs) and **Google Gemini 2.5 Flash Lite** for fast, accurate, and context-grounded response generation.

---

## 🛠️ Tech Stack

### Frontend (Client UI)
| Technology | Description |
|---|---|
| **Next.js & React** | Modern UI framework and component library |
| **Redux Toolkit** | Global state management (chat history, loading states) |
| **Tailwind CSS** | Utility-first styling for a clean, responsive interface |
| **Axios** | Handling asynchronous REST API requests |

### Backend (REST API & Machine Learning)
| Technology | Description |
|---|---|
| **FastAPI / Flask** | High-performance Python web server |
| **LangChain** | LLM orchestration and RAG pipeline management |
| **Google Gemini API** | Generative LLM (`gemini-2.5-flash-lite`) |
| **Hugging Face** | Local vector embeddings (`all-MiniLM-L6-v2`) |
| **FAISS** | In-memory vector database for fast similarity search |
| **PyPDF2** | Intelligent document parsing and text extraction |

---

## ✨ Key Features

* **Decoupled Architecture:** Clean separation of concerns between the React user interface and the Python machine learning logic.
* **Intelligent Document Parsing:** Chunks documents by paragraphs and sentences, preserving semantic meaning.
* **Local Vector Embeddings:** Runs `all-MiniLM-L6-v2` entirely on your machine—no paid embedding API needed.
* **Hallucination Mitigation:** Gemini is strictly prompted to answer *only* from retrieved context. Returns a fallback if the answer isn't in the PDF.

---

## 🚀 Local Installation & Setup

Because this is a full-stack application, you will need to run the backend and the frontend simultaneously in two different terminal windows.

### 1. Clone the Repository

```bash
git clone [https://github.com/su7ox/PagePilot-v1.0.git](https://github.com/su7ox/PagePilot-v1.0.git)
cd PagePilot-v1.0
