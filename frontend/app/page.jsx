import FileUploader from "../components/FileUploader";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col">
      
      <div className="w-full max-w-2xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 PagePilot</h1>
        <p className="text-gray-600">Your intelligent PDF assistant</p>
      </div>

      {/* 1. Upload Section */}
      <FileUploader />

      {/* 2. Chat History Section */}
      <ChatWindow />

      {/* 3. Input Section */}
      <ChatInput />
      
    </main>
  );
}