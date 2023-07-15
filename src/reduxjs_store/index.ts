import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cellsApi } from "./apis";

export const store = configureStore({
  reducer: {
    [cellsApi.reducerPath]: cellsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cellsApi.middleware),
});

setupListeners(store.dispatch);
