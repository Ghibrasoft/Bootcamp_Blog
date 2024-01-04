import { RootState } from "../store";

const blogs = (state: RootState) => state.getBlogs;

export { blogs };
