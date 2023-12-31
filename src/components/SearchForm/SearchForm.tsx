import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchBooks,
  setSearchQuery,
  setStartIndex,
} from "../../store/slices/booksSlice";
import styles from "./searchForm.module.scss";
import { Button } from "../../ui/Button/Button";
import { SortAndFilterBooks } from "../SortAndFilterBooks/SortAndFilterBooks";
import { defaultStartIndex } from "../../utils/constants";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { sortingBy, categoryQuery, searchQuery, startIndex, booksPerFetch } =
    useAppSelector((state) => state.booksSlice);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startIndex !== defaultStartIndex) {
      dispatch(setStartIndex(defaultStartIndex));
    }
    dispatch(
      fetchBooks({
        sortingBy,
        categoryQuery,
        searchQuery,
        startIndex,
        booksPerFetch,
      })
    );
  };

  return (
    <form className={styles.formSearch} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="search"
          placeholder="search books..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={styles.inputSearch}
        />
        <div className={styles.inputLoupe}>
          <AiOutlineSearch />
        </div>
      </div>
      <SortAndFilterBooks />
      <Button type="submit" variant="search">
        Search
      </Button>
    </form>
  );
};
