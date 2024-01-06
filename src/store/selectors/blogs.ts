import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const blogs = (state: RootState) => state.getBlogs;

const currentDate = new Date();

const selectFilteredBlogsByDate = createSelector([blogs], (blogs) =>
  blogs.data.filter((blog) => new Date(blog.publish_date) <= currentDate)
);

const selectFilteredBlogsByCategory = createSelector(
  [blogs, (_: RootState, checkedTitles: string[]) => checkedTitles],
  (blogs, checkedTitles) =>
    blogs.data.filter(
      (blog) =>
        blog.categories.some((category) =>
          checkedTitles.some(
            (categoryTitle) => categoryTitle === category.title
          )
        ) && new Date(blog.publish_date) <= currentDate
    )
);

export { blogs, selectFilteredBlogsByDate, selectFilteredBlogsByCategory };
