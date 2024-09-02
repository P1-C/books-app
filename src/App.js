import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenreSelectionPage from './Components/GenreSelectionPage';
import BookListPage from './Components/BookListPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenreSelectionPage />} />
        <Route path="/books/:genre" element={<BookListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
