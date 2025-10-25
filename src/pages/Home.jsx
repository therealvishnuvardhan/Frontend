import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleBookSlot = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  // Dynamic gradients based on theme
  const backgroundGradient = userInfo 
    ? (isDark 
        ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" 
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
    : (isDark 
        ? "linear-gradient(135deg, #2d0f0f 0%, #1a1a2e 50%, #0f2d2d 100%)" 
        : "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)");

  const mainButtonGradient = userInfo 
    ? (isDark 
        ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
        : "linear-gradient(135deg, #48c78e, #20c997)")
    : (isDark 
        ? "linear-gradient(135deg, #667eea, #764ba2)" 
        : "linear-gradient(135deg, #667eea, #764ba2)");

  const featureCardBg = isDark 
    ? "rgba(255,255,255,0.05)" 
    : "rgba(255,255,255,0.1)";
  
  const featureCardHoverBg = isDark 
    ? "rgba(255,255,255,0.1)" 
    : "rgba(255,255,255,0.15)";

  const textColor = isDark ? "#ffffff" : "#ffffff";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.8)";

  return (
    <div style={{ 
      minHeight: "100vh",
      background: backgroundGradient,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }}>
      <Navbar />

      {/* Main Content - Fixed Header */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "60px",
        color: textColor,
        marginTop: "80px"
      }}>
        <div style={{
          position: "relative",
          display: "inline-block"
        }}>
          <h1 style={{ 
            fontSize: "4rem", 
            margin: "0 0 15px 0",
            fontWeight: "700",
            textShadow: isDark 
              ? "0 0 20px rgba(255,107,107,0.8), 0 0 40px rgba(72,199,142,0.6), 0 0 60px rgba(102,126,234,0.4)" 
              : "3px 3px 6px rgba(0,0,0,0.3)",
            color: isDark 
              ? "#ff6b6b"  // Solid neon red for dark theme
              : "#ffffff", // Solid white for light theme
            transition: "all 0.5s ease",
            position: "relative",
            zIndex: 2
          }}>
            AutoTech
          </h1>
          
          {/* Glow effect for dark theme */}
          {isDark && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "4rem",
              fontWeight: "700",
              background: "linear-gradient(45deg, #ff6b6b, #48c78e, #667eea)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              opacity: 0.3,
              filter: "blur(8px)",
              zIndex: 1,
              pointerEvents: "none"
            }}>
              AutoTech
            </div>
          )}
        </div>
        
        <p style={{ 
          fontSize: "1.3rem", 
          margin: "0",
          opacity: "0.95",
          maxWidth: "500px",
          fontWeight: "300",
          letterSpacing: "0.5px",
          color: secondaryTextColor
        }}>
          Smart Parking Solutions - Book your spot in seconds
        </p>
      </div>

      {/* Main Action Button */}
      <button
        style={{ 
          padding: "22px 55px", 
          fontSize: "1.4rem", 
          fontWeight: "600",
          background: mainButtonGradient,
          color: "white",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          boxShadow: isDark 
            ? "0 8px 25px rgba(255,107,107,0.3)" 
            : "0 8px 25px rgba(72, 199, 142, 0.4)",
          transition: "all 0.4s ease",
          marginBottom: "30px",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "1px",
          position: "relative",
          zIndex: 2
        }}
        onClick={handleBookSlot}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = isDark 
            ? "0 12px 30px rgba(255,107,107,0.5)" 
            : "0 12px 30px rgba(72, 199, 142, 0.5)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = isDark 
            ? "0 8px 25px rgba(255,107,107,0.3)" 
            : "0 8px 25px rgba(72, 199, 142, 0.4)";
        }}
      >
        {userInfo ? "🚗 Book a Slot Now" : "🔐 Login to Book Slot"}
      </button>

      {/* Features Section */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "30px", 
        marginTop: "80px",
        maxWidth: "1100px",
        width: "100%"
      }}>
        <div style={{ 
          background: featureCardBg, 
          padding: "30px", 
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          border: isDark 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid rgba(255,255,255,0.25)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          zIndex: 2
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-8px) scale(1.02)";
          e.target.style.background = featureCardHoverBg;
          e.target.style.boxShadow = isDark 
            ? "0 20px 40px rgba(0,0,0,0.3)" 
            : "0 20px 40px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.background = featureCardBg;
          e.target.style.boxShadow = "none";
        }}>
          <h3 style={{ 
            color: textColor, 
            marginBottom: "15px", 
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>⚡ Instant Booking</h3>
          <p style={{ 
            color: secondaryTextColor, 
            margin: "0",
            fontSize: "1rem",
            lineHeight: "1.6",
            fontWeight: "300"
          }}>
            Reserve your parking spot instantly with our seamless booking system
          </p>
        </div>
        
        <div style={{ 
          background: featureCardBg, 
          padding: "30px", 
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          border: isDark 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid rgba(255,255,255,0.25)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          zIndex: 2
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-8px) scale(1.02)";
          e.target.style.background = featureCardHoverBg;
          e.target.style.boxShadow = isDark 
            ? "0 20px 40px rgba(0,0,0,0.3)" 
            : "0 20px 40px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.background = featureCardBg;
          e.target.style.boxShadow = "none";
        }}>
          <h3 style={{ 
            color: textColor, 
            marginBottom: "15px", 
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>📍 Smart Locations</h3>
          <p style={{ 
            color: secondaryTextColor, 
            margin: "0",
            fontSize: "1rem",
            lineHeight: "1.6",
            fontWeight: "300"
          }}>
            Discover premium parking locations with real-time availability updates
          </p>
        </div>
        
        <div style={{ 
          background: featureCardBg, 
          padding: "30px", 
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          border: isDark 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid rgba(255,255,255,0.25)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          zIndex: 2
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-8px) scale(1.02)";
          e.target.style.background = featureCardHoverBg;
          e.target.style.boxShadow = isDark 
            ? "0 20px 40px rgba(0,0,0,0.3)" 
            : "0 20px 40px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.background = featureCardBg;
          e.target.style.boxShadow = "none";
        }}>
          <h3 style={{ 
            color: textColor, 
            marginBottom: "15px", 
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>💰 Best Value</h3>
          <p style={{ 
            color: secondaryTextColor, 
            margin: "0",
            fontSize: "1rem",
            lineHeight: "1.6",
            fontWeight: "300"
          }}>
            Competitive pricing with guaranteed spots and no hidden charges
          </p>
        </div>
      </div>
    </div>
  );
}