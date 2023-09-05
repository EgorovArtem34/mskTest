import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCategoryQuery, setSortingBy } from "../../store/slices/booksSlice";
import { CategoryType, SortEnum } from "../../types";
import { categories, sortingVariants } from "../../utils/constants";
import styles from "./sortAndFilterBooks.module.scss";

export const SortAndFilterBooks = () => {
  const dispatch = useAppDispatch();

  const { sortingBy, categoryQuery } = useAppSelector(
    (state) => state.booksSlice
  );

  const handleCategory = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    dispatch(setCategoryQuery(value as CategoryType));
  };

  const handleSort = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    dispatch(setSortingBy(value as SortEnum));
  };

  return (
    <div className={styles.filterAndSort}>
      <label className={styles.label}>
        Categories
        <select
          name="categories"
          onChange={handleCategory}
          value={categoryQuery}
          placeholder="Не выбрано"
          className={styles.select}
          required
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Sorting by
        <select
          name="sorting"
          onChange={handleSort}
          value={sortingBy}
          placeholder="sorting"
          className={styles.select}
          required
        >
          {sortingVariants.map((sortBy) => (
            <option value={sortBy} key={sortBy}>
              {sortBy}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
