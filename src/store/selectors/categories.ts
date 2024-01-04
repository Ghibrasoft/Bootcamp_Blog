import { RootState } from "../store";

const categoriesData = (state: RootState) => state.getCategories;

export { categoriesData };
