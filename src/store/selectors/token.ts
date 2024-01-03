import { RootState } from "../store";

const token = (state: RootState) => state.getToken.token;

export { token };
