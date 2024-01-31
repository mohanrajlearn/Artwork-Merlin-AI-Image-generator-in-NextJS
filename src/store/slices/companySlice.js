import { createSlice } from "@reduxjs/toolkit";
import { $axios, baseUrl } from "@/utils/http";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCompany,
  setLoading,
  setError,
  clearError,
} = companySlice.actions;

export const selectCompany = (state) => state.company.company;
export const selectLoading = (state) => state.company.loading;
export const selectError = (state) => state.company.error;

export const fetchImage = (prompt) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await $axios.get(`${baseUrl}/generate-images`, {
      params: { prompt },
    });
    dispatch(setCompany(res.data));
    return res;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
export default companySlice.reducer;
