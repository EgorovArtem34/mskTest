import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { BookPage } from "./pages/BookPage/BookPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
