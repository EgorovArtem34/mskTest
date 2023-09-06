import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { createUrl } from "./../../utils/api";
import { defaultStartIndex, sortingVariants } from "../../utils/constants";
import { CategoryType, SortEnum } from "../../types";
import {
  IError,
  FetchBooksParams,
  IFetchDataBooks,
  IBookSliceState,
} from "../types";

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

export const fetchMoreBooks = createAsyncThunk(
  "books/fetchMoreBooks",
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

const initialState: IBookSliceState = {
  books: [],
  booksPerFetch: 30,
  totalItems: 1,
  errors: {
    fetchBooksErr: null,
    fetchMoreBooksErr: null,
  },
  isLoadings: {
    fetchBooksLoading: false,
    fetchMoreBooksLoading: false,
  },
  sortingBy: sortingVariants[0],
  categoryQuery: "all",
  searchQuery: "",
  startIndex: defaultStartIndex,
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
    setStartIndex: (state, { payload }: PayloadAction<number>) => {
      state.startIndex = payload;
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
      .addCase(fetchBooks.rejected, (state, action) => {
        const payload = action.payload as AxiosError<IError>;
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
      )

      .addCase(fetchMoreBooks.pending, (state) => {
        state.errors.fetchMoreBooksErr = null;
        state.isLoadings.fetchMoreBooksLoading = true;
      })
      .addCase(fetchMoreBooks.rejected, (state, action) => {
        const payload = action.payload as AxiosError<IError>;
        state.errors.fetchMoreBooksErr = payload.message;
        state.isLoadings.fetchMoreBooksLoading = false;
      })
      .addCase(
        fetchMoreBooks.fulfilled,
        (state, { payload }: PayloadAction<IFetchDataBooks>) => {
          const { items, totalItems } = payload;
          state.totalItems = totalItems;
          state.books = [...state.books, ...items];
          state.errors.fetchMoreBooksErr = null;
          state.isLoadings.fetchMoreBooksLoading = false;
        }
      );
  },
});

export const { setSortingBy, setCategoryQuery, setSearchQuery, setStartIndex } =
  booksSlice.actions;
export default booksSlice.reducer;
