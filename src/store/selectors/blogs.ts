import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const blogs = (state: RootState) => state.getBlogs;
const selectCurrentDate = () => new Date();

const selectFilteredBlogsByDate = createSelector(
  [blogs, selectCurrentDate],
  (blogs, currentDate) =>
    blogs.data.filter((blog) => new Date(blog.publish_date) <= currentDate)
);

const selectFilteredBlogsByCategory = createSelector(
  [
    blogs,
    selectCurrentDate,
    (_: RootState, checkedTitles: string[]) => checkedTitles,
  ],
  (blogs, currentDate, checkedTitles) =>
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
