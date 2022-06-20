import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {
    id: null,
    name: "",
    resumenPlato: "",
    scoreSaludable: null,
    pasoApaso: "",
    imageLink: "",
  },
  status: "idle",
  error: null,
  name: null,
};

export const fetchRecipe = createAsyncThunk(
  "recipe/fetchRecipe",
  async (initialRequest, { rejectWithValue }) => {
    const { id } = initialRequest;
    try {
      const response = await fetch(`http://localhost:3001/recipes/${id}`);
      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      return response.json();
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    backStatus(state, action) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipe = { ...action.payload.msg };
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.payload.error;
      });
  },
});

export const { backStatus } = recipeSlice.actions;

export default recipeSlice.reducer;
