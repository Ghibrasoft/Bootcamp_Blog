import { RootState } from "../store";

const loggedUser = (state: RootState) => state.login;

export { loggedUser };
