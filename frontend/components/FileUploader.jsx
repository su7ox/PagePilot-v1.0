'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUploading, setError } from '../store/chatSlice';
import { uploadPdfDocument } from '../services/api';

export default function FileUploader() {
  const dispatch = useDispatch();
  const { isUploading } = useSelector((state) => state.chat);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      dispatch(setError('Please upload a valid PDF file.'));
      return;
    }

    dispatch(setUploading(true));
    dispatch(setError(null));
    setUploadSuccess(false);

    try {
      // Send to the backend
      await uploadPdfDocument(file);
      setUploadSuccess(true);
    } catch (err) {
      dispatch(setError('Failed to upload the document. Is your Python server running?'));
    } finally {
      dispatch(setUploading(false));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Document Upload</h2>
          <p className="text-sm text-gray-500">Upload your PDF to start chatting</p>
        </div>
        
        <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          <span>{isUploading ? 'Uploading...' : 'Choose PDF'}</span>
          <input 
            type="file" 
            accept=".pdf" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {uploadSuccess && (
        <div className="mt-3 text-sm text-green-600 font-medium">
          ✅ Document processed successfully! You can now ask questions.
        </div>
      )}
    </div>
  );
}