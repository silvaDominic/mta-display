import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { TrainLineSelectionPage } from "./pages/train-line-selection.page";
import { StationSelectionPage } from "./pages/station-selection.page";
import { DisplaysDemoPage } from "./pages/displays-demo.page";
import { PlatformSelectionPage } from "./pages/platform-selection.page";
import { DisplayPage } from "./pages/display.page";

import './normalize.css';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplaysDemoPage />}/>
        <Route path='/train_lines' element={<TrainLineSelectionPage />} />
        <Route path='/train_lines/:line' element={<StationSelectionPage />} />
        <Route path='/train_lines/:line/stations/:station' element={<PlatformSelectionPage />} />
        <Route path='/train_lines/:line/stations/:station/platforms/:direction' element={<DisplayPage />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}
