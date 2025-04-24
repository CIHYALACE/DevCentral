import '../style/App.css'
import { Routes, Route } from 'react-router-dom'
import SharedLayout from '../sharedLayout/SharedLayout'
import HomePage from '../pages/homePage'
import Login from '../pages/login'
import Register from '../pages/register'
import ItemDetails from '../pages/appDetails' // Assuming this is the correct path to your ItemDetails component
import GamesPage from '../pages/games' // Assuming this is the correct path to your games component
import AppsPage from '../pages/applications'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/apps" element={<AppsPage />} /> {/* Assuming you want to show the same page for apps */}
        <Route path="/details/:type/:id" element={<ItemDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      
    </Routes>
  )
}
