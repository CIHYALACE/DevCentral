import '../style/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
// Layouts
import SharedLayout from '../sharedLayout/SharedLayout'
import AdminSharedLayout from '../sharedLayout/AdminSharedLayout'
import ProfileSharedLayout from '../sharedLayout/ProfileSharedLayout'
// Pages
import HomePage from '../pages/homePage'
import Login from '../pages/login'
import Register from '../pages/register'
import ItemDetails from '../pages/appDetails'
import GamesPage from '../pages/games'
import AppsPage from '../pages/applications'
import BooksPage from '../pages/BooksPage'
import ActivateAccount from '../pages/ActivateAccount'
// Profile Pages
import ProfilePage from '../pages/ProfilePage'
import MyPrograms from '../pages/MyPrograms'
import AddProgram from '../pages/AddProgram'
import InfoSection from '../pages/profile/InfoSection'
import PaymentOptions from '../pages/profile/PaymentOptions'
import Subscriptions from '../pages/profile/Subscriptions'
import Devices from '../pages/profile/Devices'
import OrderHistory from '../pages/profile/OrderHistory'
// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminPrograms from '../pages/admin/AdminPrograms'
import AdminReviews from '../pages/admin/AdminReviews'
import AdminMedia from '../pages/admin/AdminMedia'
import AdminTokens from '../pages/admin/AdminTokens'
import AdminCategories from '../pages/admin/AdminCategories'

export default function App() {
  return (
    <Routes>

      <Route path="/admin" element={<AdminSharedLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="tokens" element={<AdminTokens />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>

      <Route path="/profile" element={<ProfileSharedLayout />}>
        <Route index element={<InfoSection />} />
        <Route path="my-programs" element={<MyPrograms />} />
        <Route path="add-program" element={<AddProgram />} />
        <Route path="payment-options" element={<PaymentOptions />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="devices" element={<Devices />} />
        <Route path="order-history" element={<OrderHistory />} />
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
