import axios from "axios";
import { ICategories, IErrorResponse } from "../../../types/blogType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk<
  ICategories[],
  void,
  { rejectValue: IErrorResponse }
>("blogs/categories", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      "https://api.blog.redberryinternship.ge/api/categories"
    );
    return res.data.data;
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
  data: ICategories[];
  loading: boolean;
  error: IErrorResponse | null;
}

const initialState: InitialStateProps = {
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
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategories[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
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
