import './App.css';
import Home from "./pages/Home";
import Language from './pages/Language';
import Genre from './pages/Genre';
import Upload from './pages/Upload';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/language" element={<Language />} />
      <Route path="/language/:lang" element={<Genre />} />
      <Route path="/language/:lang/:genre" element={<Upload />} />
    </Routes>
  );
}

export default App;