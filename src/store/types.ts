import { CategoryType, IBook, SortEnum } from "./../types/index";

export interface IError {
  message: string | string[];
  statusCode: number;
}

export interface FetchBooksParams {
  sortingBy: SortEnum;
  categoryQuery: CategoryType;
  searchQuery: string;
  startIndex: number;
  booksPerFetch: number;
}

export interface IFetchDataBooks {
  kind: string;
  totalItems: number;
  items: IBook[];
}
