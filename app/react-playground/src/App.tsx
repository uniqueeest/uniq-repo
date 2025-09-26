import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';

const About2 = lazy(() =>
  import('./pages/About2').then((module) => ({ default: module.About2 })),
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about2" element={<About2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
