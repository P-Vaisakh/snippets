import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../requests_app/config";
import { base } from "../requests_app/base";

export const fetchAllSnippets = createAsyncThunk(
  "snippets/fetchAllSnippets",
  async () => {
    let { data } = await request("get", `${base}/snippets`, {});
    return data;
  }
);

const snippetsSlice = createSlice({
  name: "snippets",
  initialState: {
    loading: false,
    data: [],
    searchArr: [],
    err: "",
  },
  reducers: {
    filterSnippets: (state, action) => {
      state.data = state.searchArr.filter((items) =>
        items.snippetName
          .toLowerCase()
          .trim()
          .includes(action.payload.toLowerCase().trim())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSnippets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSnippets.fulfilled, (state, action) => {
      state.data = action.payload;
      state.searchArr = action.payload;
      state.loading = false;
      state.err = "";
    });
    builder.addCase(fetchAllSnippets.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = false;
      state.data = [];
    });
  },
});

export default snippetsSlice.reducer;
export const {filterSnippets}=snippetsSlice.actions
