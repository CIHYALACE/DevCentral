import '../style/App.css'
import { Routes, Route } from 'react-router-dom'
import SharedLayout from '../sharedLayout/SharedLayout'
import HomePage from '../pages/homePage'
import Login from '../pages/login'
import Register from '../pages/register'
import ItemDetails from '../pages/appDetails' // Assuming this is the correct path to your ItemDetails component
import GamesPage from '../pages/games' // Assuming this is the correct path to your games component
import AppsPage from '../pages/applications'
import BooksPage from '../pages/BooksPage'
import ActivateAccount from '../pages/ActivateAccount'
import AdminSharedLayout from '../sharedLayout/AdminSharedLayout'
import AdminPage from '../pages/AdminPage'
import ProfileSharedLayout from '../sharedLayout/ProfileSharedLayout'
import ProfilePage from '../pages/ProfilePage'
import UserProfile from '../pages/UserProfile'
import MyPrograms from './pages/MyPrograms';
import AddProgram from './pages/AddProgram';

export default function App() {
  return (
    <Routes>

      <Route path="/admin" element={<AdminSharedLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="/profile" element={<ProfileSharedLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-programs" element={<MyPrograms />} />
        <Route path="/add-program" element={<AddProgram />} />
      </Route>

      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/apps" element={<AppsPage />} /> {/* Assuming you want to show the same page for apps */}
        <Route path="/books" element={<BooksPage />} />
        <Route path="/details/:type/:slug" element={<ItemDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
      </Route>
    </Routes>
  )
}
