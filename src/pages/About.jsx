import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function About() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Poppins', sans-serif",
      paddingTop: "80px"
    }}>
      <Navbar />
      
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        color: "white"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "30px",
          background: "linear-gradient(45deg, #fff, #f0f0f0)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          About AutoTech
        </h1>

        <div style={{
          background: "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
          lineHeight: "1.8"
        }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "25px" }}>
            AutoTech is revolutionizing the way people think about parking. We combine cutting-edge technology 
            with user-friendly design to create a seamless parking experience for everyone.
          </p>

          <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", fontWeight: "600" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "25px" }}>
            To eliminate the stress and uncertainty of finding parking by providing smart, reliable, 
            and convenient parking solutions that work for everyone.
          </p>

          <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", fontWeight: "600" }}>
            Why Choose AutoTech?
          </h2>
          <ul style={{ fontSize: "1.1rem", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>🚀 Instant booking with real-time availability</li>
            <li style={{ marginBottom: "10px" }}>📍 Multiple premium locations across the city</li>
            <li style={{ marginBottom: "10px" }}>💰 Transparent pricing with no hidden fees</li>
            <li style={{ marginBottom: "10px" }}>🔒 Secure QR-based access system</li>
            <li style={{ marginBottom: "10px" }}>📱 User-friendly interface designed for everyone</li>
          </ul>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={() => navigate(userInfo ? "/booking" : "/signup")}
              style={{
                background: "linear-gradient(135deg, #48c78e, #20c997)",
                color: "white",
                border: "none",
                padding: "15px 40px",
                borderRadius: "25px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Poppins', sans-serif"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 25px rgba(72, 199, 142, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {userInfo ? "Book Your Spot" : "Get Started Today"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}