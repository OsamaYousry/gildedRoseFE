import { AppState } from "./app.state";

export const selectItems = (state: AppState) => state.items.entity;
export const selectLoading = (state: AppState) => state.items.loading;