import { CategoryType, SortEnum } from "../types";

export const categories: CategoryType[] = [
  "all",
  "art",
  "biography",
  "computers",
  "history",
  "medical",
  "poetry",
];

export const sortingVariants: SortEnum[] = [
  SortEnum.Relevance,
  SortEnum.Newest,
];

export const regexForBookId = /\/([^/]+)$/;
export const defaultStartIndex = 0;
// export const minQueryLength = 3;
