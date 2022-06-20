import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paginado } from "../../utils/recipesPaginate";
const initialState = {
  previousRecipes: [],
  recipes: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 0,
  pageSize: 0,
  totalCounts: 0,
  name: null,
  symbol: "",
  currentRecipes: [],
};

export const AddRecipes = createAsyncThunk(
  "recipe/AddNewPost",
  async (initialRequest, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...initialRequest }),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/recipes",
        requestOptions
      );
      if (!response.ok) return rejectWithValue(await response.json());
      const data = await response.json();
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (initalRequest, { rejectWithValue }) => {
    const { name, page, order } = initalRequest;
    const url = new URL(`http://localhost:3001/recipes`);
    const params = new URLSearchParams(url.search);
    if (name) {
      params.set("name", name);
    }
    if (page) {
      params.set("page", page);
    }
    if (params) url.search = params;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      return response.json();
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    recipeNameAdded(state, action) {
      state.name = action.payload;
    },
    orderBy(state, action) {
      if (action.payload.s === "+" && action.payload.vari === "name") {
        state.recipes.sort((a, b) => (a.name > b.name ? 1 : -1));
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }

      if (action.payload.s === "-" && action.payload.vari === "name") {
        state.recipes.sort((a, b) => (a.name < b.name ? 1 : -1));
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }

      if (action.payload.s === "+" && action.payload.vari === "score") {
        state.recipes.sort((a, b) =>
          a.scoreSaludable > b.scoreSaludable ? 1 : -1
        );
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }

      if (action.payload.s === "-" && action.payload.vari === "score") {
        state.recipes.sort((a, b) =>
          a.scoreSaludable < b.scoreSaludable ? 1 : -1
        );
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }
      if (action.payload.s === "+" && action.payload.vari === "t") {
        state.recipes.sort((a, b) => (a.minutos > b.minutos ? 1 : -1));
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }

      if (action.payload.s === "-" && action.payload.vari === "t") {
        state.recipes.sort((a, b) => (a.minutos < b.minutos ? 1 : -1));
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      }
    },
    paginateInternal(state, action) {
      state.currentPage = action.payload.newPage;
      const rta = paginado(action.payload.newPage, null, state.recipes);
      state.currentRecipes = rta;
    },
    filterByDiet(state, action) {
      state.previousRecipes = state.recipes;
      let tag = action.payload.dieta;
      let listaFitrada = [];
      for (let i = 0; i < state.recipes.length; i++) {
        for (let j = 0; j < state.recipes[i].Diets.length; j++) {
          if (state.recipes[i].Diets[j].name === tag) {
            listaFitrada.push(state.recipes[i]);
          }
        }
      }
      state.recipes = listaFitrada;
      state.totalPages = Math.ceil(state.recipes.length / state.pageSize);
      state.currentPage = 0;
      const rta = paginado(action.payload.newPage, null, state.recipes);
      state.currentRecipes = rta;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.recipes = action.payload.msg.recipes;

        state.currentPage = action.payload.msg.currentPage;
        state.totalPages = action.payload.msg.totalPages;
        state.pageSize = 9;
        state.totalCounts = action.payload.msg.totalRecipes;
        const rta = paginado(
          action.payload.msg.currentPage,
          null,
          state.recipes
        );
        state.currentRecipes = rta;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(AddRecipes.fulfilled, (state, action) => {
        console.log(action);
        state.recipes.unshift(action.payload.msg);
        const rta = paginado(state.currentPage, null, state.recipes);
        state.currentRecipes = rta;
      });
  },
});

export const { recipeNameAdded, orderBy, paginateInternal, filterByDiet } =
  recipesSlice.actions;
export const selectAllRecipes = (state) => state.recipes.currentRecipes;

export default recipesSlice.reducer;
