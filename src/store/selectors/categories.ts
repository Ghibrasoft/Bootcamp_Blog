import { RootState } from "../store";

const categoriesData = (state: RootState) => state.getCategories.data;

export { categoriesData };
