import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/login/loginSlice";
import blogsSlice from "./reducers/blogs/blogsSlice";
import addBlogSlice from "./reducers/add-blog/addBlogSlice";
import categoriesSlice from "./reducers/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    getBlogs: blogsSlice,
    addBlog: addBlogSlice,
    getCategories: categoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
