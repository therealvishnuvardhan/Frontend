import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function SlotSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { vehicle, location: place, startTime, endTime } = location.state || {};
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  const slots = Array.from({ length: 12 }, (_, i) => `Slot ${i + 1}`);

  const handleNext = () => {
    if (!selectedSlot) {
      alert("Please select a slot!");
      return;
    }
    navigate("/payment", { state: { vehicle, place, startTime, endTime, selectedSlot } });
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
        maxWidth: "800px",
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
          Select Your Parking Slot
        </h1>

        {/* Booking Summary */}
        <div style={{
          background: cardBg,
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "30px",
          border: isDark 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(15px)"
        }}>
          <h3 style={{ 
            color: isDark ? "#ff6b6b" : "#48c78e", 
            marginBottom: "15px", 
            textAlign: "center" 
          }}>
            Booking Summary
          </h3>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            flexWrap: "wrap", 
            gap: "10px",
            color: textColor
          }}>
            <div><strong>Vehicle:</strong> {vehicle || "Not specified"}</div>
            <div><strong>Location:</strong> {place || "Not specified"}</div>
            <div><strong>Start Time:</strong> {startTime ? new Date(startTime).toLocaleString() : "Not specified"}</div>
            <div><strong>End Time:</strong> {endTime ? new Date(endTime).toLocaleString() : "Not specified"}</div>
          </div>
        </div>

        {/* Slot Grid */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ 
            textAlign: "center", 
            marginBottom: "20px",
            color: textColor,
            fontSize: "1.2rem"
          }}>
            Available Slots
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
              marginTop: "20px"
            }}
          >
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  padding: "25px 10px",
                  background: selectedSlot === slot 
                    ? (isDark ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" : "linear-gradient(135deg, #48c78e, #20c997)")
                    : cardBg,
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  backdropFilter: "blur(10px)",
                  border: isDark 
                    ? "1px solid rgba(255,255,255,0.1)" 
                    : "1px solid rgba(255,255,255,0.2)",
                  transform: selectedSlot === slot ? "scale(1.05)" : "scale(1)"
                }}
                onMouseOver={(e) => {
                  if (selectedSlot !== slot) {
                    e.target.style.transform = "translateY(-5px) scale(1.05)";
                    e.target.style.background = cardHoverBg;
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedSlot !== slot) {
                    e.target.style.transform = selectedSlot === slot ? "scale(1.05)" : "scale(1)";
                    e.target.style.background = selectedSlot === slot 
                      ? (isDark ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" : "linear-gradient(135deg, #48c78e, #20c997)")
                      : cardBg;
                  }
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Slot Display */}
        {selectedSlot && (
          <div style={{
            background: isDark 
              ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
              : "linear-gradient(135deg, #48c78e, #20c997)",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
            border: "2px solid rgba(255,255,255,0.3)",
            textAlign: "center"
          }}>
            <strong style={{ color: "white", fontSize: "1.2rem" }}>
              ✅ Selected: {selectedSlot}
            </strong>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <button
            style={{
              width: "100%",
              padding: "18px 20px",
              backgroundColor: selectedSlot 
                ? (isDark ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" : "linear-gradient(135deg, #48c78e, #20c997)")
                : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: selectedSlot ? "pointer" : "not-allowed",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              boxShadow: selectedSlot 
                ? (isDark ? "0 6px 20px rgba(255,107,107,0.3)" : "0 6px 20px rgba(72, 199, 142, 0.3)")
                : "none"
            }}
            onClick={handleNext}
            disabled={!selectedSlot}
            onMouseOver={(e) => {
              if (selectedSlot) {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = isDark 
                  ? "0 10px 25px rgba(255,107,107,0.5)" 
                  : "0 10px 25px rgba(72, 199, 142, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              if (selectedSlot) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = isDark 
                  ? "0 6px 20px rgba(255,107,107,0.3)" 
                  : "0 6px 20px rgba(72, 199, 142, 0.3)";
              }
            }}
          >
            {selectedSlot ? "🚗 Proceed to Payment" : "Please Select a Slot"}
          </button>

          <button
            onClick={() => navigate("/booking")}
            style={{
              width: "100%",
              padding: "15px 20px",
              backgroundColor: "transparent",
              color: isDark ? "#ff6b6b" : "#667eea",
              border: `2px solid ${isDark ? "#ff6b6b" : "#667eea"}`,
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = isDark ? "#ff6b6b" : "#667eea";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = isDark ? "#ff6b6b" : "#667eea";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ← Back to Booking
          </button>
        </div>
      </div>
    </div>
  );
}