import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ILoginFormData {
  email: string;
}
interface ILoginStateType {
  isLogged: boolean;
  loading: boolean;
  error: IErrorResponse | null;
}
interface IErrorResponse {
  message: string;
  errors: {
    email?: string[];
  };
}
const initialState: ILoginStateType = {
  isLogged: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  any,
  ILoginFormData,
  { rejectValue: IErrorResponse }
>("login/loginUser", async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      "https://api.blog.redberryinternship.ge/api/login",
      formData
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
