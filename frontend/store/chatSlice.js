import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isUploading: false,
  isWaitingForResponse: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setWaiting: (state, action) => {
      state.isWaitingForResponse = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setUploading, setWaiting, addMessage, setError } = chatSlice.actions;
export default chatSlice.reducer;