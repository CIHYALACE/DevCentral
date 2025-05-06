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
import BookDetails from '../pages/BookDetails';
import SearchResults from '../pages/SearchResults';
import ActivateAccount from '../pages/ActivateAccount';
import Checkout from '../pages/Checkout'
// Profile Pages
import MyPrograms from '../pages/MyPrograms'
import PublishedPrograms from '../pages/PublishedPrograms'
import AddProgram from '../pages/AddProgram'
import EditProgram from '../pages/EditProgram'
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
import AdminRequests from '../pages/admin/AdminRequests'
import AdminRoute from '../components/Admin/AdminRoute'


export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminSharedLayout />}>
        <Route index element={<AdminRoute element={<Navigate to="/admin/dashboard" />} />} />
        <Route path="dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="programs" element={<AdminRoute element={<AdminPrograms />} />} />
        <Route path="reviews" element={<AdminRoute element={<AdminReviews />} />} />
        <Route path="media" element={<AdminRoute element={<AdminMedia />} />} />
        <Route path="tokens" element={<AdminRoute element={<AdminTokens />} />} />
        <Route path="categories" element={<AdminRoute element={<AdminCategories />} />} />
        <Route path="requests" element={<AdminRoute element={<AdminRequests />} />} />
      </Route>

      <Route path="/profile" element={<ProfileSharedLayout />}>
        <Route index element={<InfoSection />} />
        <Route path="my-programs" element={<MyPrograms />} />
        <Route path="published-programs" element={<PublishedPrograms />} />
        <Route path="add-program" element={<AddProgram />} />
        <Route path="edit-program/:slug" element={<EditProgram />} />
        <Route path="payment-options" element={<PaymentOptions />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="devices" element={<Devices />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Route>

      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:slug" element={<BookDetails />} />
        <Route path="/details/:type/:slug" element={<ItemDetails />} />
        <Route path="/checkout/:slug" element={<Checkout />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
