import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle, place, startTime, endTime, selectedSlot } = location.state || {};
  const [method, setMethod] = useState("");

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method!");
      return;
    }
    alert("Payment Successful ✅");
    
    // ✅ FIXED: Use startTime as the main time for QR page
    navigate("/qr-page", { 
      state: { 
        vehicle, 
        place, 
        time: startTime, // Use startTime as the main time
        selectedSlot, 
        method 
      } 
    });
  };

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
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "10px",
          color: "#333",
          fontSize: "28px",
          fontWeight: "bold"
        }}>
          Payment
        </h2>

        <p style={{ 
          textAlign: "center", 
          color: "#666",
          marginBottom: "30px",
          fontSize: "16px"
        }}>
          Complete your parking reservation
        </p>

        {/* Booking Summary */}
        <div style={{
          background: "rgba(102, 126, 234, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          border: "1px solid rgba(102, 126, 234, 0.2)"
        }}>
          <h3 style={{ color: "#667eea", marginBottom: "15px", textAlign: "center" }}>
            Booking Summary
          </h3>
          <div style={{ textAlign: "left", lineHeight: "1.6" }}>
            <div><strong>Vehicle:</strong> {vehicle || "Not specified"}</div>
            <div><strong>Location:</strong> {place || "Not specified"}</div>
            <div><strong>Start Time:</strong> {startTime ? new Date(startTime).toLocaleString() : "Not specified"}</div>
            <div><strong>End Time:</strong> {endTime ? new Date(endTime).toLocaleString() : "Not specified"}</div>
            <div><strong>Slot:</strong> {selectedSlot || "Not specified"}</div>
            <div style={{ 
              borderTop: "1px solid #ddd", 
              marginTop: "10px", 
              paddingTop: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#28a745"
            }}>
              <strong>Total Amount:</strong> ₹{parkingFee}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ 
            marginBottom: "15px",
            color: "#333",
            fontSize: "18px"
          }}>
            Select Payment Method
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* UPI Option */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                border: `2px solid ${method === "UPI" ? "#28a745" : "#ddd"}`,
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: method === "UPI" ? "rgba(40, 167, 69, 0.1)" : "white",
                transition: "all 0.3s ease"
              }}
            >
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setMethod(e.target.value)}
                style={{ marginRight: "15px", transform: "scale(1.2)" }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>📱</span>
                <div>
                  <div style={{ fontWeight: "bold", color: "#333" }}>UPI Payment</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>Google Pay, PhonePe, Paytm</div>
                </div>
              </div>
            </label>

            {/* Card Option */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                border: `2px solid ${method === "Card" ? "#28a745" : "#ddd"}`,
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: method === "Card" ? "rgba(40, 167, 69, 0.1)" : "white",
                transition: "all 0.3s ease"
              }}
            >
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setMethod(e.target.value)}
                style={{ marginRight: "15px", transform: "scale(1.2)" }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>💳</span>
                <div>
                  <div style={{ fontWeight: "bold", color: "#333" }}>Credit/Debit Card</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>Visa, Mastercard, RuPay</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <button
            style={{
              width: "100%",
              padding: "15px 20px",
              backgroundColor: method ? "#28a745" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: method ? "pointer" : "not-allowed",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              boxShadow: method ? "0 4px 15px rgba(40, 167, 69, 0.3)" : "none"
            }}
            onClick={handlePayment}
            disabled={!method}
            onMouseOver={(e) => {
              if (method) {
                e.target.style.backgroundColor = "#218838";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (method) {
                e.target.style.backgroundColor = "#28a745";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.3)";
              }
            }}
          >
            {method ? `Pay ₹${parkingFee} & Confirm` : "Select Payment Method"}
          </button>

          <button
            onClick={() => navigate("/slots")}
            style={{
              width: "100%",
              padding: "12px 20px",
              backgroundColor: "transparent",
              color: "#667eea",
              border: "2px solid #667eea",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#667eea";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#667eea";
            }}
          >
            ← Back to Slot Selection
          </button>
        </div>

        {/* Security Notice */}
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "rgba(255, 193, 7, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 193, 7, 0.3)",
          textAlign: "center",
          fontSize: "14px",
          color: "#856404"
        }}>
          🔒 Your payment is secure and encrypted
        </div>
      </div>
    </div>
  );
}