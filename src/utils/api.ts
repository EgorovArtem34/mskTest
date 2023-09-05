import { CategoryType, SortEnum } from "../types";
import { sortingVariants } from "./constants";
const apiUrl = "https://www.googleapis.com/books/v1";

const APIKey = import.meta.env.VITE__API_KEY;

export const createUrl = (
  sortingBy: SortEnum,
  categoryQuery: CategoryType,
  searchQuery: string,
  startIndex: number,
  booksPerFetch: number
) => {
  const searchQueryParam = searchQuery
    ? `volumes?q=${searchQuery}`
    : `volumes?q=""`;
  const categoryParam =
    categoryQuery !== "all"
      ? `${searchQueryParam}+subject:${categoryQuery}`
      : `${searchQueryParam}`;
  const startIndexParam = startIndex !== 0 ? `startIndex=${startIndex}` : "";
  const maxResultParam = `maxResults=${booksPerFetch}`;
  const sortingParam = sortingBy !== "relevance" ? `orderBy=${sortingBy}` : "";
  const keyParam = `key=${APIKey}`;

  const queryParams = [
    categoryParam,
    startIndexParam,
    maxResultParam,
    sortingParam,
    keyParam,
  ]
    .filter((param) => param.length > 0)
    .join("&");
  return [apiUrl, queryParams].join("/");
};
