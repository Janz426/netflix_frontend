import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Importa o componente Home atualizado
import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} /> {/* Atualiza para usar o Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
