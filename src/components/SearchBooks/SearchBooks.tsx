import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./searchBooks.module.scss";
import { Button } from "../../ui/Button/Button";
import { categories, sortingVariants } from "../../utils/constants";
import { SortEnum } from "../../types";

const minQueryLength = 3;

export const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isShortQuery, setIsShortQuery] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortingBy, setSortingBy] = useState(sortingVariants[0]);

  useEffect(() => {
    const isQueryShort = searchQuery.length <= minQueryLength;
    if (isQueryShort !== isShortQuery) {
      setIsShortQuery(isQueryShort);
    }
  }, [isShortQuery, searchQuery.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };
  const handleCategory = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setActiveCategory(value);
  };
  const handleSort = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSortingBy(value as SortEnum);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Search for books</h1>
      <form className={styles.formSearch} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.inputSearch}
        />
        <div className={styles.inputLoupe}>
          <AiOutlineSearch />
        </div>
        <Button type="submit" variant="search" disabled={isShortQuery}>
          Search
        </Button>
      </form>

      <div className={styles.filterAndSort}>
        <label className={styles.label}>
          Categories
          <select
            name="categories"
            onChange={handleCategory}
            value={activeCategory}
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
    </header>
  );
};
