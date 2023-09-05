import { PayloadAction } from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { createUrl } from "./../../utils/api";
import { sortingVariants } from "../../utils/constants";
import { CategoryType, IBook, SortEnum } from "../../types";
import { IError, FetchBooksParams, IFetchDataBooks } from "../types";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params: FetchBooksParams) => {
    const { sortingBy, categoryQuery, searchQuery, startIndex, booksPerFetch } =
      params;
    const createdUrl = createUrl(
      sortingBy,
      categoryQuery,
      searchQuery,
      startIndex,
      booksPerFetch
    );
    try {
      const { data }: { data: IFetchDataBooks } = await axios.get(createdUrl);
      return data;
    } catch (err) {
      const error = err as AxiosError<IError>;
      console.log(error.message);
      throw error.message;
    }
  }
);

interface AppState {
  books: IBook[];
  booksPerFetch: number;
  totalItems: number;
  errors: {
    fetchBooksErr: null | string;
  };
  isLoadings: {
    fetchBooksLoading: boolean;
  };
  sortingBy: SortEnum;
  categoryQuery: CategoryType;
  searchQuery: string;
  startIndex: number;
}

const initialState: AppState = {
  books: [],
  booksPerFetch: 30,
  totalItems: 1,
  errors: {
    fetchBooksErr: null,
  },
  isLoadings: {
    fetchBooksLoading: false,
  },
  sortingBy: sortingVariants[0],
  categoryQuery: "all",
  searchQuery: "",
  startIndex: 0,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSortingBy: (state, { payload }: PayloadAction<SortEnum>) => {
      state.sortingBy = payload;
    },
    setCategoryQuery: (state, { payload }: PayloadAction<CategoryType>) => {
      state.categoryQuery = payload;
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    // setTotalItems: (state, { payload }: PayloadAction<number>) => {
    //   state.totalItems = payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.errors.fetchBooksErr = null;
        state.isLoadings.fetchBooksLoading = true;
      })
      .addCase(fetchBooks.rejected, (state, { payload }: PayloadAction<any>) => {
        console.log(typeof payload);
        state.errors.fetchBooksErr = payload.message;
        state.isLoadings.fetchBooksLoading = false;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, { payload }: PayloadAction<IFetchDataBooks>) => {
          const { items, totalItems } = payload;
          state.totalItems = totalItems;
          state.books = items;
          state.errors.fetchBooksErr = null;
          state.isLoadings.fetchBooksLoading = false;
        }
      );
  },
});

export const { setSortingBy, setCategoryQuery, setSearchQuery } =
  booksSlice.actions;
export default booksSlice.reducer;
