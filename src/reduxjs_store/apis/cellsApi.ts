import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Cell {
  id: number;
}

export const cellsApi = createApi({
  reducerPath: "cells",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Cells"],
  endpoints: (builder) => ({
    fetchCells: builder.query<Cell, void>({
      query: () => ({
        url: "/cells",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchCellsQuery } = cellsApi;
