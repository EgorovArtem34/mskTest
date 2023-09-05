import { useEffect } from "react";
import styles from "./books.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBooks } from "../../store/slices/booksSlice";
import { BookItem } from "../BookItem/BookItem";
import { Loader } from "../Loader/Loader";

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
    if (books?.length === 0) {
      console.log("active");
      dispatch(
        fetchBooks({
          sortingBy,
          categoryQuery,
          searchQuery,
          startIndex,
          booksPerFetch,
        })
      );
    }
  }, [
    books?.length,
    booksPerFetch,
    categoryQuery,
    dispatch,
    searchQuery,
    sortingBy,
    startIndex,
  ]);

  if (fetchBooksLoading) {
    return (
      <main className={styles.main}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <p className={styles.countBooks}>
        Found {books?.length || 0} {books?.length > 1 ? "results" : "result"}
      </p>
      {books && (
        <div className={styles.books}>
          {books.map((book) => (
            <BookItem book={book} key={book.etag} />
          ))}
        </div>
      )}
    </main>
  );
};
