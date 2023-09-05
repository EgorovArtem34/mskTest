import { Link } from "react-router-dom";
import { IBook } from "../../types";
import styles from "./bookItem.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BookItem = ({ book }: { book: IBook }) => {
  const {
    volumeInfo: { imageLinks, authors, categories, title },
  } = book;
  return (
    <div className={styles.book}>
      <Link
        to={`/books/${book.id}`}
        className={`${styles.link} ${
          imageLinks?.smallThumbnail ? "" : styles.learnMore
        }`}
      >
        {imageLinks?.smallThumbnail ? (
          <img
            src={imageLinks?.smallThumbnail}
            className={styles.img}
            alt="book cover"
          />
        ) : (
          <span>Learn More</span>
        )}
      </Link>
      {categories?.length > 0 && (
        <p className={styles.categories}>{categories[0]}</p>
      )}
      <div className={styles.info}>
        {title && <h3>{title}</h3>}
        {authors && <p>{authors.join(", ")}</p>}
      </div>
    </div>
  );
};
