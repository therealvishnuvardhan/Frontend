import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import SlotSelection from "./pages/SlotSelection";
import Payment from "./pages/Payment";
import QRPage from "./pages/QRPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import MyBookings from "./pages/MyBookings";
import Locations from "./pages/Locations";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          
          {/* PROTECTED ROUTES */}
          <Route path="/booking" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/slots" element={
            <ProtectedRoute>
              <SlotSelection />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          {/* ✅ CHANGED: This route now matches Payment.jsx navigation */}
          <Route path="/qr-page" element={
            <ProtectedRoute>
              <QRPage />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/locations" element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;