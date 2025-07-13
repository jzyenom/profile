import React, { useEffect, useState, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/style.css";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import EmailVerificationPage from "./pages/EmailVerification/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
// import Navbar from "./components/Navbar/Navbar";
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
import Footer from "./components/Footer/Footer";
// import Homepage from "./pages/Home/Homepage";
const Homepage = React.lazy(() => import("./pages/Home/Homepage"));
// import Cart from "./pages/Cart/Cart";
const Cart = React.lazy(() => import("./pages/Cart/Cart"));

import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import CreateRestaurant from "./pages/Restaurant/CreateRestaurant";
import UpdateRestaurant from "./pages/Restaurant/UpdateRestaurant";
import RestaurantList from "./pages/Restaurant/RestaurantList";
// import RestaurantPage from "./pages/Restaurant/RestaurantPage";
const RestaurantPage = React.lazy(() =>
  import("./pages/Restaurant/RestaurantPage")
);

import CreateCategory from "./pages/Category/CreateCategory";
import UpdateCategory from "./pages/Category/UpdateCategory";
import CategoryList from "./pages/Category/CategoryList";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateMenu from "./components/Menu/CreateMenu";
import InstallPrompt from "./components/InstallPrompt/InstallPrompt";
import UsersPage from "./pages/UsersPage/UsersPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import { StoreContext } from "./context/StoreContext";
import MyMenus from "./pages/MyMenus/MyMenus";
import UpdateMenu from "./pages/UpdateMenu/UpdateMenu";
import InventoryPage from "./pages/Inventory/InventoryPage";
import ExpenditureManagementPage from "./pages/ExpenditureManagement/ExpenditureManagementPage";
import UsagePage from "./pages/Usage/UsagePage";
import SalesPage from "./pages/Sales/SalesPage";
import LandingPage from "./pages/LandingPage/LandingPage";

// Protected routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

// Redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  // This category state will be removed soon
  const [category, setCategory] = useState("All");

  const { fetchFoodList, foodList, loading, error } = useContext(StoreContext);

  useEffect(() => {
    fetchFoodList(); // ✅ Call it on mount
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  const showSidebar = isAuthenticated && user?.isVerified;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="app min-h-screen flex bg-white relative overflow-hidden">
        {showSidebar && <Sidebar />}

        <InstallPrompt />
        <div className="flex-1 flex flex-col min-h-screen">
          {/* <Navbar setShowLogin={setShowLogin} /> */}
          <Suspense fallback={<div />}>
            <Navbar setShowLogin={setShowLogin} />
          </Suspense>

          <main className="flex-1" style={{marginTop:'2rem'}}>
            <Routes>
              <Route path="/" index element={<LandingPage />} />
              <Route path="/menu" index element={<Homepage />} />
              <Route path="/cart" index element={<Cart />} />
              <Route path="/order" index element={<PlaceOrder />} />
              <Route path="/order/:id" index element={<PlaceOrder />} />
              <Route path="/order-success" index element={<OrderSuccess />} />
              <Route path="/all-orders" index element={<OrdersPage />} />

              <Route
                path="/signup"
                element={
                  <RedirectAuthenticatedUser>
                    <SignupPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectAuthenticatedUser>
                    <LoginPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route
                path="/forgot-password"
                element={
                  <RedirectAuthenticatedUser>
                    <ForgotPasswordPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <RedirectAuthenticatedUser>
                    <ResetPasswordPage />
                  </RedirectAuthenticatedUser>
                }
              />

              {/* Protected dashboard & management routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-restaurant"
                element={
                  <ProtectedRoute>
                    <CreateRestaurant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute>
                    <InventoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenditure"
                element={
                  <ProtectedRoute>
                    <ExpenditureManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usage"
                element={
                  <ProtectedRoute>
                    <UsagePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <SalesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-restaurant/:updateId"
                element={
                  <ProtectedRoute>
                    <UpdateRestaurant />
                  </ProtectedRoute>
                }
              />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route
                path="/restaurant/:restaurantId"
                element={<RestaurantPage category={category} />}
              />

              <Route
                path="/create-category"
                element={
                  <ProtectedRoute>
                    <CreateCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-category/:updateId"
                element={
                  <ProtectedRoute>
                    <UpdateCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/:categoryId"
                element={<CategoryList />}
              />

              <Route
                path="/create-menu"
                element={
                  <ProtectedRoute>
                    <CreateMenu />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/update-menu/:updateId"
                element={
                  <ProtectedRoute>
                    <UpdateMenu />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-menus"
                element={
                  <ProtectedRoute>
                    <MyMenus />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <Toaster />
      </div>
    </Suspense>
  );
}

export default App;
