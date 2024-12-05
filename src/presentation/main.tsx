import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { DisplaysDemoPage } from "./pages/displays-demo.page";

import './index.css'

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplaysDemoPage />}/>
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}
