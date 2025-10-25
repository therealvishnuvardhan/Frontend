import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function Locations() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [locations] = useState([
    {
      id: 1,
      name: "Shopping Mall",
      address: "123 Downtown Street, City Center",
      slots: 45,
      price: "₹50/hour",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1629045675129-2e6b672f6d58?w=400&h=200&fit=crop",
      description: "Secure underground parking with 24/7 surveillance"
    },
    {
      id: 2,
      name: "Hospital",
      address: "456 Medical Avenue, Health District",
      slots: 120,
      price: "₹30/hour",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=200&fit=crop",
      description: "Emergency parking with priority for patients and visitors"
    },
    {
      id: 3,
      name: "Airport",
      address: "789 Skyway Boulevard, Airport Zone",
      slots: 300,
      price: "₹80/hour",
      image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&h=200&fit=crop",
      description: "Long-term parking with shuttle service to terminals"
    },
    {
      id: 4,
      name: "Train Station",
      address: "321 Railway Road, Transit Center",
      slots: 85,
      price: "₹40/hour",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1471289549423-04adaecfa1b6?w=400&h=200&fit=crop",
      description: "Convenient parking for daily commuters and travelers"
    },
    {
      id: 5,
      name: "Business District",
      address: "654 Corporate Plaza, Downtown",
      slots: 200,
      price: "₹70/hour",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1551524164-6ca64fb04e0e?w=400&h=200&fit=crop",
      description: "Premium parking with valet service and EV charging"
    },
    {
      id: 6,
      name: "University Campus",
      address: "987 Education Lane, Academic Zone",
      slots: 150,
      price: "₹25/hour",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
      parkingImage: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400&h=200&fit=crop",
      description: "Student and faculty parking with discounted rates"
    }
  ]);

  // Theme-based styles
  const backgroundGradient = isDark 
    ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" 
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  const cardBg = isDark 
    ? "rgba(30, 30, 50, 0.8)" 
    : "rgba(255,255,255,0.1)";

  const cardHoverBg = isDark 
    ? "rgba(40, 40, 60, 0.9)" 
    : "rgba(255,255,255,0.15)";

  const textColor = isDark ? "#ffffff" : "#ffffff";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.8)";

  const handleBookNow = (locationName) => {
    navigate("/booking", { state: { presetLocation: locationName } });
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: backgroundGradient,
      fontFamily: "'Poppins', sans-serif",
      paddingTop: "80px",
      transition: "all 0.5s ease"
    }}>
      <Navbar />
      
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        <h1 style={{
          color: textColor,
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "40px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          Our Parking Locations
        </h1>

        <div style={{
          display: "grid",
          gap: "30px",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))"
        }}>
          {locations.map((location) => (
            <div key={location.id} style={{
              background: cardBg,
              borderRadius: "20px",
              overflow: "hidden",
              backdropFilter: "blur(15px)",
              border: isDark 
                ? "1px solid rgba(255,255,255,0.1)" 
                : "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: "translateY(0) scale(1)",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.background = cardHoverBg;
              e.currentTarget.style.boxShadow = isDark 
                ? "0 20px 40px rgba(0,0,0,0.4)" 
                : "0 20px 40px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.background = cardBg;
              e.currentTarget.style.boxShadow = "none";
            }}>
              {/* Location Image */}
              <div style={{ position: "relative" }}>
                <img 
                  src={location.image} 
                  alt={location.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
                <div style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "5px 15px",
                  borderRadius: "15px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(0,0,0,0.9)";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(0,0,0,0.7)";
                  e.target.style.transform = "scale(1)";
                }}>
                  {location.slots} slots available
                </div>
              </div>

              {/* Parking Image */}
              <div style={{ 
                padding: "15px", 
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)"}`,
                transition: "all 0.3s ease"
              }}>
                <h4 style={{ 
                  color: textColor, 
                  margin: "0 0 10px 0", 
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease"
                }}>
                  Parking Area Preview
                </h4>
                <img 
                  src={location.parkingImage} 
                  alt={`${location.name} Parking`}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    transition: "all 0.4s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.03)";
                    e.target.style.filter = "brightness(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.filter = "brightness(1)";
                  }}
                />
              </div>

              {/* Location Details */}
              <div style={{ padding: "25px" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start", 
                  marginBottom: "15px",
                  transition: "all 0.3s ease"
                }}>
                  <div>
                    <h3 style={{ 
                      color: textColor, 
                      margin: "0 0 5px 0", 
                      fontSize: "1.4rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#48c78e";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = textColor;
                    }}>
                      {location.name}
                    </h3>
                    <p style={{ 
                      color: secondaryTextColor, 
                      margin: "0", 
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = isDark ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.9)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = secondaryTextColor;
                    }}>
                      {location.address}
                    </p>
                  </div>
                  <div style={{
                    background: isDark 
                      ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                      : "linear-gradient(135deg, #48c78e, #20c997)",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "15px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = isDark 
                      ? "0 5px 15px rgba(255,107,107,0.4)" 
                      : "0 5px 15px rgba(72, 199, 142, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}>
                    {location.price}
                  </div>
                </div>

                <p style={{ 
                  color: secondaryTextColor, 
                  margin: "0 0 25px 0",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.color = isDark ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.95)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = secondaryTextColor;
                }}>
                  {location.description}
                </p>

                {/* Single Book Now Button */}
                <button
                  onClick={() => handleBookNow(location.name)}
                  style={{
                    width: "100%",
                    background: isDark 
                      ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                      : "linear-gradient(135deg, #48c78e, #20c997)",
                    color: "white",
                    border: "none",
                    padding: "15px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fontFamily: "'Poppins', sans-serif"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px) scale(1.02)";
                    e.target.style.boxShadow = isDark 
                      ? "0 12px 30px rgba(255,107,107,0.5)" 
                      : "0 12px 30px rgba(72, 199, 142, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  🚗 Book Parking at {location.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}