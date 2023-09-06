import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { regexForBookId } from "../../utils/constants";
import { IBook } from "../../types";
import styles from "./bookPage.module.scss";
import { SearchBooks } from "../../components/SearchBooks/SearchBooks";

export const BookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentBook, setCurrentBook] = useState<IBook>();
  const { books } = useAppSelector((state) => state.booksSlice);

  useEffect(() => {
    const path = location.pathname;

    const match = path.match(regexForBookId);
    if (match) {
      const currentBookId = match[1];
      const foundBook = books.find((book) => book.id === currentBookId);
      foundBook ? setCurrentBook(foundBook) : "";
    }
  }, [location.pathname, dispatch, books]);

  useEffect(() => {
    if (books.length === 0) {
      navigate("/");
    }
  }, [books, navigate]);

  const {
    volumeInfo: { imageLinks, authors, categories, title, description },
  } = currentBook as IBook;

  return (
    <>
      <SearchBooks hasOnlyTitle={true} />
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          {imageLinks?.thumbnail && (
            <img
              src={imageLinks?.thumbnail}
              alt="book cover"
              className={styles.image}
            />
          )}
        </div>

        <div className={styles.info}>
          {categories?.length > 0 && (
            <p className={styles.categories}>{categories.join(", ")}</p>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
          {authors && <p className={styles.authors}>{authors.join(", ")}</p>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </main>
    </>
  );
};
