import { useEffect } from "react";
import styles from "./books.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBooks } from "../../store/slices/booksSlice";
import { BookItem } from "../BookItem/BookItem";

export const Books = () => {
  const dispatch = useAppDispatch();
  const {
    books,
    sortingBy,
    categoryQuery,
    searchQuery,
    startIndex,
    booksPerFetch,
    isLoadings: { fetchBooksLoading },
    errors: { fetchBooksErr },
  } = useAppSelector((state) => state.booksSlice);

  useEffect(() => {
    dispatch(
      fetchBooks({
        sortingBy,
        categoryQuery,
        searchQuery,
        startIndex,
        booksPerFetch,
      })
    );
  }, [
    booksPerFetch,
    categoryQuery,
    dispatch,
    searchQuery,
    sortingBy,
    startIndex,
  ]);

  return (
    <main className={styles.main}>
      <p>Hello</p>
      <div className={styles.books}>
        {books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
    </main>
  );
};
