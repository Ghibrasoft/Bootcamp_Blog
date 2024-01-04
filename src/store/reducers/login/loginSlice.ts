import axios from "axios";
import { IErrorResponse } from "../../../types/blogType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk<
  any,
  string,
  { rejectValue: IErrorResponse }
>("login/loginUser", async (userEmail, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      "https://api.blog.redberryinternship.ge/api/login",
      userEmail
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

interface InitialStateProps {
  isLogged: boolean;
  loading: boolean;
  error: IErrorResponse | null;
}

const initialState: InitialStateProps = {
  isLogged: false,
  loading: false,
  error: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLogged = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An error occurred", errors: {} };
        }
      });
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
