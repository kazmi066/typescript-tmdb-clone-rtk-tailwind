import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/home';
import { MovieInfo } from './pages/movieInfo';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:id" element={<MovieInfo />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App;
