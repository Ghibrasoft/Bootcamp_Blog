import axios from "axios";
import { IErrorResponse } from "../../../types/blogType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addBlog = createAsyncThunk<
  void,
  { formData: FormData; token: string },
  { rejectValue: IErrorResponse }
>("blogs/addblog", async ({ formData, token }, { rejectWithValue }) => {
  try {
    await axios.post(
      "https://api.blog.redberryinternship.ge/api/blogs",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

interface InitialStateProps {
  loading: boolean;
  error: IErrorResponse | null;
}
const initialState: InitialStateProps = {
  loading: false,
  error: null,
};
const addBlogSlice = createSlice({
  name: "blogs/addblog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An error occurred", errors: {} };
        }
      });
  },
});

export const {} = addBlogSlice.actions;
export default addBlogSlice.reducer;
