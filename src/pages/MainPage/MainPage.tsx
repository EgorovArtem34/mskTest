import { Books } from "../../components/Books/Books";
import { SearchBooks } from "../../components/SearchBooks/SearchBooks";

export const MainPage = () => {
  return (
    <>
      <SearchBooks />
      <Books />
    </>
  );
};
