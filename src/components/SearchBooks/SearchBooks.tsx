import { Link } from "react-router-dom";
import styles from "./searchBooks.module.scss";
import { SearchForm } from "../SearchForm/SearchForm";

export const SearchBooks = ({ hasOnlyTitle = false }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <h2 className={styles.title}>Search for books</h2>
      </Link>
      {!hasOnlyTitle && <SearchForm />}
    </header>
  );
};
