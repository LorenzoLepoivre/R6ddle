import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Character from './components/mode/Character';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<Character />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
