import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toasts: [],
    confirm: "",
    alert: "",
    paymentStatus: false,
    currentTab: "1",
  },
  reducers: {
    addToast: (state, action) => {
      const { payload } = action;
      const id = payload.id || Date.now();
      state.toasts = [...state.toasts, { ...payload, id }];
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload.id);
    },
    killToast: (state, action) => {
      state.toasts = state.toasts.map((t) =>
        t.id !== action.payload.id ? t : { ...t, dead: true }
      );
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const {
  addToast,
  removeToast,
  killToast,
  setConfirm,
  setAlert,
  setPaymentStatus,
  setCurrentTab,
} = uiSlice.actions;

export const selectToasts = (state) => state.ui.toasts;
export const selectConfirm = (state) => state.ui.confirm;
export const selectAlert = (state) => state.ui.alert;
export const selectPaymentStatus = (state) => state.ui.paymentStatus;
export const selectCurrentTab = (state) => state.ui.currentTab;

export default uiSlice.reducer;
