import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PagePilot",
  description: "Chat with your PDF documents using RAG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}