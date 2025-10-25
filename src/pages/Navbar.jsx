import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  // Theme-based styles
  const navbarStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    background: isDark 
      ? "rgba(10, 10, 20, 0.9)" 
      : "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderBottom: isDark 
      ? "1px solid rgba(255, 255, 255, 0.1)" 
      : "1px solid rgba(255, 255, 255, 0.2)",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: "1000",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  };

  const textColor = isDark ? "#ffffff" : "#ffffff";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.8)";

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <div 
        onClick={() => navigate("/")}
        style={{
          color: textColor,
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.color = isDark ? "#ff6b6b" : "#48c78e";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.color = textColor;
        }}
      >
        AutoTech
      </div>

      {/* Navigation Links - Only show when logged in */}
      {userInfo && (
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <button
            onClick={() => navigate("/my-bookings")}
            style={{
              background: "transparent",
              color: textColor,
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseOver={(e) => {
              e.target.style.background = isDark 
                ? "rgba(255,107,107,0.2)" 
                : "rgba(255,255,255,0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            My Bookings
          </button>
          
          <button
            onClick={() => navigate("/locations")}
            style={{
              background: "transparent",
              color: textColor,
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseOver={(e) => {
              e.target.style.background = isDark 
                ? "rgba(72,199,142,0.2)" 
                : "rgba(255,255,255,0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            View Locations
          </button>

          <button
            onClick={() => navigate("/about")}
            style={{
              background: "transparent",
              color: textColor,
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseOver={(e) => {
              e.target.style.background = isDark 
                ? "rgba(102,126,234,0.2)" 
                : "rgba(255,255,255,0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            About
          </button>
        </div>
      )}

      {/* User Section */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: isDark 
              ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
              : "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fontFamily: "'Poppins', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.05)";
            e.target.style.boxShadow = isDark 
              ? "0 8px 20px rgba(255,107,107,0.4)" 
              : "0 8px 20px rgba(102,126,234,0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>

        {userInfo ? (
          <>
            <span style={{ color: textColor, fontSize: "14px" }}>
              Welcome, {userInfo.user.name}!
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: isDark 
                  ? "linear-gradient(135deg, #ff6b6b, #ee5a52)" 
                  : "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                fontFamily: "'Poppins', sans-serif"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 5px 15px rgba(255,107,107,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                color: textColor,
                border: `2px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.3)"}`,
                padding: "8px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                fontFamily: "'Poppins', sans-serif"
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDark 
                  ? "rgba(255,255,255,0.1)" 
                  : "rgba(255,255,255,0.1)";
                e.target.style.borderColor = isDark 
                  ? "rgba(255,255,255,0.5)" 
                  : "rgba(255,255,255,0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = isDark 
                  ? "rgba(255,255,255,0.3)" 
                  : "rgba(255,255,255,0.3)";
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                background: isDark 
                  ? "linear-gradient(135deg, #48c78e, #20c997)" 
                  : "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                fontFamily: "'Poppins', sans-serif"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = isDark 
                  ? "0 5px 15px rgba(72, 199, 142, 0.4)" 
                  : "0 5px 15px rgba(102,126,234,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}