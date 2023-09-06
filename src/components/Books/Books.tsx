import { useEffect } from "react";
import styles from "./books.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchBooks,
  fetchMoreBooks,
  setStartIndex,
} from "../../store/slices/booksSlice";
import { BookItem } from "../BookItem/BookItem";
import { Loader } from "../Loader/Loader";
import { Button } from "../../ui/Button/Button";

export const Books = () => {
  const dispatch = useAppDispatch();
  const {
    books,
    sortingBy,
    categoryQuery,
    searchQuery,
    startIndex,
    totalItems,
    booksPerFetch,
    isLoadings: { fetchBooksLoading, fetchMoreBooksLoading },
    errors: { fetchBooksErr, fetchMoreBooksErr },
  } = useAppSelector((state) => state.booksSlice);

  useEffect(() => {
    if (books?.length === 0) {
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

  const handleMoreBooks = () => {
    const newStartIndex = startIndex + booksPerFetch;
    dispatch(setStartIndex(newStartIndex));
    dispatch(
      fetchMoreBooks({
        sortingBy,
        categoryQuery,
        searchQuery,
        startIndex: newStartIndex,
        booksPerFetch,
      })
    );
  };

  return (
    <main className={styles.main}>
      <p className={styles.countBooks}>
        Found {books?.length || 0} {books?.length > 1 ? "results" : "result"}
      </p>
      {fetchBooksLoading && <Loader />}
      {fetchBooksErr && (
        <p className={styles.center}>fetch error {fetchBooksErr}</p>
      )}
      {books && !fetchBooksLoading && !fetchBooksErr && (
        <div className={styles.books}>
          {books.map((book) => (
            <BookItem book={book} key={book.etag} />
          ))}
        </div>
      )}
      {fetchMoreBooksLoading && <Loader />}
      {fetchMoreBooksErr && (
        <p className={styles.center}>fetch error {fetchMoreBooksErr}</p>
      )}
      {books?.length !== 0 && totalItems - (startIndex + booksPerFetch) > 0 && (
        <Button
          variant="more"
          aria-label="load more books"
          onClick={handleMoreBooks}
        >
          Load more
        </Button>
      )}
    </main>
  );
};
