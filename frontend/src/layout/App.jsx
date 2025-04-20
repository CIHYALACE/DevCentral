import '../style/App.css'
import { Routes, Route } from 'react-router-dom'
import SharedLayout from '../sharedLayout/SharedLayout'
import HomePage from '../pages/homePage'
import Login from '../pages/login'
import Register from '../pages/register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}
