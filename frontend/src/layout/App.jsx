<<<<<<< HEAD
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
=======
import '../style/App.css'
import { Routes, Route } from 'react-router-dom'
import SharedLayout from '../sharedLayout/SharedLayout'
import HomePage from '../pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
>>>>>>> Games
}

export default App;
