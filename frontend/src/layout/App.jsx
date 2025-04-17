import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../layout/login';
import Register from '../layout/register';
import HomePage from '../layout/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
