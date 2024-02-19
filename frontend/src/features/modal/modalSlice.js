import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalShow: false,
    modalMessage: null,
    modalTitle: null
};


export const modalSlice = createSlice({
  name: 'modal', 
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalShow = true;
      state.modalMessage = action.payload.message;
      state.modalTitle = action.payload.title;
    },
    hideModal: (state) => {
      state.modalShow = false;
      state.modalMessage = null;
      state.modalTitle = null;
    }
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
