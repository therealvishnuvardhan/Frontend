import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle, place, time, selectedSlot, method } = location.state || {};

  // If no booking details, show message
  if (!vehicle || !place || !time || !selectedSlot) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}>
        <div style={{ 
          maxWidth: "500px", 
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#ff4444", marginBottom: "20px" }}>No Booking Details Found!</h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Please complete your booking to generate a QR code.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#5a6fd8";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#667eea";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Convert booking details to a QR-friendly string
  const qrData = JSON.stringify({ 
    vehicle, 
    place, 
    time, 
    selectedSlot,
    bookingId: `BK${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString()
  });

  // Calculate parking fee based on vehicle type
  const calculateFee = () => {
    const baseRates = {
      Car: 50,
      Bike: 20,
      Truck: 100,
      SUV: 70
    };
    return baseRates[vehicle] || 40;
  };

  const parkingFee = calculateFee();
  const bookingId = `BK${Date.now().toString().slice(-6)}`;

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        maxWidth: "500px", 
        width: "100%",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        textAlign: "center"
      }}>
        {/* Success Header */}
        <div style={{
          background: "rgba(40, 167, 69, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          border: "2px solid #28a745"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>✅</div>
          <h2 style={{ 
            color: "#28a745",
            margin: "0 0 5px 0",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            Booking Confirmed!
          </h2>
          <p style={{ 
            color: "#666",
            margin: "0",
            fontSize: "14px"
          }}>
            Your parking slot has been reserved successfully
          </p>
        </div>

        {/* Booking ID */}
        <div style={{
          background: "rgba(102, 126, 234, 0.1)",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid rgba(102, 126, 234, 0.3)"
        }}>
          <strong style={{ color: "#667eea" }}>Booking ID:</strong> {bookingId}
        </div>

        {/* QR Code */}
        <div style={{
          padding: "25px",
          background: "white",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          border: "2px solid #f0f0f0"
        }}>
          <h3 style={{ 
            color: "#333",
            marginBottom: "20px",
            fontSize: "18px"
          }}>
            Scan QR Code at Entry
          </h3>
          <div style={{ 
            display: "flex", 
            justifyContent: "center",
            marginBottom: "15px"
          }}>
            <QRCodeCanvas 
              value={qrData} 
              size={200}
              bgColor="#ffffff"
              fgColor="#333333"
              level="H"
              includeMargin={true}
            />
          </div>
          <p style={{ 
            color: "#666",
            fontSize: "12px",
            margin: "0"
          }}>
            Valid for {new Date(time).toLocaleDateString()}
          </p>
        </div>

        {/* Booking Details */}
        <div style={{
          background: "rgba(248, 249, 250, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          textAlign: "left",
          border: "1px solid #e9ecef"
        }}>
          <h3 style={{ 
            color: "#333",
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "16px"
          }}>
            Booking Details
          </h3>
          <div style={{ lineHeight: "1.8" }}>
            <div><strong>Vehicle:</strong> {vehicle}</div>
            <div><strong>Location:</strong> {place}</div>
            <div><strong>Date & Time:</strong> {new Date(time).toLocaleString()}</div>
            <div><strong>Parking Slot:</strong> {selectedSlot}</div>
            {method && <div><strong>Payment Method:</strong> {method}</div>}
            <div style={{ 
              borderTop: "1px solid #ddd", 
              marginTop: "10px", 
              paddingTop: "10px",
              fontWeight: "bold",
              color: "#28a745"
            }}>
              <strong>Amount Paid:</strong> ₹{parkingFee}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          background: "rgba(255, 193, 7, 0.1)",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "25px",
          border: "1px solid rgba(255, 193, 7, 0.3)",
          textAlign: "left"
        }}>
          <h4 style={{ color: "#856404", margin: "0 0 10px 0", fontSize: "14px" }}>
            📋 Instructions:
          </h4>
          <ul style={{ 
            color: "#856404", 
            margin: "0", 
            paddingLeft: "20px",
            fontSize: "12px",
            lineHeight: "1.5"
          }}>
            <li>Show this QR code at parking entry</li>
            <li>Keep this confirmation for your records</li>
            <li>Arrive within 15 minutes of booked time</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <button
            onClick={() => window.print()}
            style={{
              width: "100%",
              padding: "12px 20px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#5a6fd8";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#667eea";
              e.target.style.transform = "translateY(0)";
            }}
          >
            🖨️ Print Confirmation
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "12px 20px",
              backgroundColor: "transparent",
              color: "#28a745",
              border: "2px solid #28a745",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#28a745";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#28a745";
            }}
          >
            🏠 Book Another Slot
          </button>
        </div>
      </div>
    </div>
  );
}