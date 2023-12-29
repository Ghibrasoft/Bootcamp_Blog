import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/login/loginSlice";
import addBlogSlice from "./reducers/add-blog/addBlogSlice";
import blogsSlice from "./reducers/blogs/blogsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    blogs: blogsSlice,
    addBlog: addBlogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
