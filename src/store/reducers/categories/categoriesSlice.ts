import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IErrorResponse } from "../../../types/blogType";

export const fetchCategories = createAsyncThunk<
  any,
  any,
  { rejectValue: IErrorResponse }
>("blogs/categories", async ({ rejectWithValue }) => {
  try {
    const res = await axios.get(
      "https://api.blog.redberryinternship.ge/api/categories"
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data.message as IErrorResponse);
      } else {
        return rejectWithValue({ message: "An error occurred", errors: {} });
      }
    } else {
      throw error;
    }
  }
});

interface IDataProps {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}
interface ICategoriesState {
  data: IDataProps[];
  loading: boolean;
  error: IErrorResponse | null;
}

const initialState: ICategoriesState = {
  data: [],
  loading: false,
  error: null,
};
const categoriesSlice = createSlice({
  name: "blogs/categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An error occurred", errors: {} };
        }
      });
  },
});

export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
