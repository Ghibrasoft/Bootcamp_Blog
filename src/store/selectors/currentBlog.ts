import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const currentBlog = (state: RootState) => state.getCurrentBlog;

const selectSimilarBlogs = createSelector(
  [currentBlog, (state: RootState) => state.getBlogs.data],
  (currentBlog, blogsData) =>
    blogsData.filter((blog) =>
      blog.categories.some((category) =>
        currentBlog.currentBlog.categories.some(
          (currentCategory) => currentCategory.id === category.id
        )
      )
    )
);

export { currentBlog, selectSimilarBlogs };
