import { RootState } from "../store";

const currentBlog = (state: RootState) => state.getCurrentBlog;

export { currentBlog };
