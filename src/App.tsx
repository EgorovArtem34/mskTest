import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
