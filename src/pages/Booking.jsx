import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    vehicle: "",
    location: "",
    startTime: "",
    endTime: ""
  });
  const [errors, setErrors] = useState({});

  // Theme-based styles
  const backgroundGradient = isDark 
    ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" 
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  const containerBg = isDark 
    ? "rgba(20, 20, 35, 0.95)" 
    : "rgba(255, 255, 255, 0.95)";

  const textColor = isDark ? "#ffffff" : "#333333";
  const borderColor = isDark ? "#333344" : "#e0e0e0";
  const errorColor = isDark ? "#ff6b6b" : "#ff4444";

  // Handle preset location from Locations page
  const presetLocation = location.state?.presetLocation;

  useEffect(() => {
    if (presetLocation) {
      setFormData(prev => ({ ...prev, location: presetLocation }));
    }
  }, [presetLocation]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Calculate minimum end time (1 hour after start time)
  const getMinEndTime = () => {
    if (!formData.startTime) return getMinDateTime();
    const start = new Date(formData.startTime);
    start.setHours(start.getHours() + 1);
    return start.toISOString().slice(0, 16);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.vehicle) newErrors.vehicle = "Vehicle type is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    
    // Additional time validation
    if (formData.startTime && new Date(formData.startTime) < new Date()) {
      newErrors.startTime = "Please select a future start time";
    }
    
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      
      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }
      
      // Minimum booking duration (1 hour)
      const minEnd = new Date(start);
      minEnd.setHours(minEnd.getHours() + 1);
      if (end < minEnd) {
        newErrors.endTime = "Minimum booking duration is 1 hour";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent form submission reload
    
    if (!validateForm()) {
      return;
    }
    
    navigate("/slots", { 
      state: { 
        vehicle: formData.vehicle, 
        location: formData.location, 
        startTime: formData.startTime,
        endTime: formData.endTime
      } 
    });
  };

  // Get minimum datetime for input (current time)
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  // Calculate duration in hours
  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      const durationMs = end - start;
      const durationHours = durationMs / (1000 * 60 * 60);
      return Math.max(1, Math.ceil(durationHours)); // Minimum 1 hour
    }
    return 0;
  };

  const duration = calculateDuration();

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minHeight: "calc(100vh - 80px)"
      }}>
        <div style={{ 
          maxWidth: "500px", 
          width: "100%",
          background: containerBg,
          borderRadius: "20px",
          padding: "40px",
          boxShadow: isDark 
            ? "0 20px 40px rgba(0, 0, 0, 0.4)" 
            : "0 20px 40px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(15px)",
          border: isDark 
            ? "1px solid rgba(255, 255, 255, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.5s ease"
        }}>
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: "30px",
            color: textColor,
            fontSize: "2rem",
            fontWeight: "700",
            background: isDark 
              ? "linear-gradient(135deg, #ff6b6b, #48c78e)" 
              : "linear-gradient(135deg, #667eea, #764ba2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>
            Book Your Parking Slot
          </h2>

          {presetLocation && (
            <div style={{
              background: isDark 
                ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                : "linear-gradient(135deg, #48c78e, #20c997)",
              color: "white",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "25px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}>
              🎯 Pre-selected: {presetLocation}
            </div>
          )}

          {/* Duration Display */}
          {duration > 0 && (
            <div style={{
              background: isDark 
                ? "linear-gradient(135deg, #667eea, #764ba2)" 
                : "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
              ⏱️ Booking Duration: {duration} hour{duration > 1 ? 's' : ''}
            </div>
          )}

          <form onSubmit={handleNext}>
            {/* Vehicle Type */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "12px",
                fontWeight: "600",
                color: textColor,
                fontSize: "1rem"
              }}>
                Vehicle Type *
              </label>
              <select 
                name="vehicle"
                value={formData.vehicle} 
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${errors.vehicle ? errorColor : borderColor}`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: isDark ? "#1a1a2e" : "white",
                  color: textColor,
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none"
                }}
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">🚗 Car</option>
                <option value="Bike">🏍️ Bike</option>
                <option value="Truck">🚚 Truck</option>
                <option value="SUV">🚙 SUV</option>
              </select>
              {errors.vehicle && (
                <span style={{ 
                  color: errorColor, 
                  fontSize: "0.85rem", 
                  marginTop: "8px", 
                  display: "block",
                  fontWeight: "500" 
                }}>
                  ⚠️ {errors.vehicle}
                </span>
              )}
            </div>

            {/* Location */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "12px",
                fontWeight: "600",
                color: textColor,
                fontSize: "1rem"
              }}>
                Location *
              </label>
              <select 
                name="location"
                value={formData.location} 
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${errors.location ? errorColor : borderColor}`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: isDark ? "#1a1a2e" : "white",
                  color: textColor,
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none"
                }}
              >
                <option value="">Select Parking Location</option>
                <option value="Shopping Mall">🏬 Shopping Mall</option>
                <option value="Hospital">🏥 Hospital</option>
                <option value="Airport">✈️ Airport</option>
                <option value="Train Station">🚆 Train Station</option>
                <option value="Business District">🏢 Business District</option>
                <option value="University Campus">🎓 University Campus</option>
              </select>
              {errors.location && (
                <span style={{ 
                  color: errorColor, 
                  fontSize: "0.85rem", 
                  marginTop: "8px", 
                  display: "block",
                  fontWeight: "500" 
                }}>
                  ⚠️ {errors.location}
                </span>
              )}
            </div>

            {/* Start Time */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "12px",
                fontWeight: "600",
                color: textColor,
                fontSize: "1rem"
              }}>
                Start Time *
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                min={getMinDateTime()}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${errors.startTime ? errorColor : borderColor}`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: isDark ? "#1a1a2e" : "white",
                  color: textColor,
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none"
                }}
              />
              {errors.startTime && (
                <span style={{ 
                  color: errorColor, 
                  fontSize: "0.85rem", 
                  marginTop: "8px", 
                  display: "block",
                  fontWeight: "500" 
                }}>
                  ⚠️ {errors.startTime}
                </span>
              )}
            </div>

            {/* End Time */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "12px",
                fontWeight: "600",
                color: textColor,
                fontSize: "1rem"
              }}>
                End Time *
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                min={getMinEndTime()}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${errors.endTime ? errorColor : borderColor}`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: isDark ? "#1a1a2e" : "white",
                  color: textColor,
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none"
                }}
              />
              {errors.endTime && (
                <span style={{ 
                  color: errorColor, 
                  fontSize: "0.85rem", 
                  marginTop: "8px", 
                  display: "block",
                  fontWeight: "500" 
                }}>
                  ⚠️ {errors.endTime}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px 20px",
                background: isDark 
                  ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                  : "linear-gradient(135deg, #48c78e, #20c997)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginTop: "10px",
                transition: "all 0.3s ease",
                boxShadow: isDark 
                  ? "0 6px 20px rgba(255,107,107,0.3)" 
                  : "0 6px 20px rgba(72, 199, 142, 0.3)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.5px"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = isDark 
                  ? "0 10px 25px rgba(255,107,107,0.5)" 
                  : "0 10px 25px rgba(72, 199, 142, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = isDark 
                  ? "0 6px 20px rgba(255,107,107,0.3)" 
                  : "0 6px 20px rgba(72, 199, 142, 0.3)";
              }}
            >
              🚗 Find Available Slots
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "14px 20px",
              backgroundColor: "transparent",
              color: isDark ? "#ff6b6b" : "#667eea",
              border: `2px solid ${isDark ? "#ff6b6b" : "#667eea"}`,
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "15px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
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
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}