import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { MovieInfo } from './pages/movieInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:type/:id" element={<MovieInfo />} />
    </Routes>
  )
}

export default App;
