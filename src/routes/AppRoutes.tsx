import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { BoardPage } from 'pages/Board/BoardPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<p>Welcome page</p>} />
      <Route path="/Boards" element={<p>Main page</p>} />
      <Route path="/Boards/:id" element={<BoardPage />} />
      <Route path="*" element={<p>404: Page not found</p>} />
    </Routes>
  );
}
