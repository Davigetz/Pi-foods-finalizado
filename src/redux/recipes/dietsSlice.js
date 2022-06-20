import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  diets: [],
  status: "idle",
  error: null,
};

export const fetchDiets = createAsyncThunk("diets/fetchdiets", async () => {
  const response = await fetch("http://localhost:3001/diets", {
    method: "GET",
  });
  return response.json();
});

const dietsSlice = createSlice({
  name: "diets",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDiets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDiets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.diets = action.payload.msg;
      })
      .addCase(fetchDiets.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
        state.error = action.error.message;
      });
  },
});

export const selectAllDiets = (state) => state.diets.diets;

export default dietsSlice.reducer;
