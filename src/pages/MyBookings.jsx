import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function MyBookings() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [editEndTime, setEditEndTime] = useState("");
  const receiptRefs = useRef({});

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

  // Mock data - in real app, you'd fetch from backend
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        vehicle: "Car",
        place: "Shopping Mall",
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
        selectedSlot: "Slot A5",
        amount: 50,
        bookingId: "BK123456",
        status: "Confirmed"
      },
      {
        id: 2,
        vehicle: "Bike",
        place: "Hospital",
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
        endTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), // Day after tomorrow + 4 hours
        selectedSlot: "Slot B2",
        amount: 20,
        bookingId: "BK789012",
        status: "Confirmed"
      }
    ];
    setBookings(mockBookings);
  }, []);

  const generateQRData = (booking) => {
    return JSON.stringify({
      bookingId: booking.bookingId,
      vehicle: booking.vehicle,
      place: booking.place,
      startTime: booking.startTime,
      endTime: booking.endTime,
      selectedSlot: booking.selectedSlot,
      amount: booking.amount
    });
  };

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowCancelPopup(true);
  };

  const handleEditClick = (booking) => {
    setBookingToEdit(booking);
    setEditEndTime(booking.endTime);
    setShowEditPopup(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingToCancel.id));
      setShowCancelPopup(false);
      setBookingToCancel(null);
      
      // Show success message
      setTimeout(() => {
        alert(`Booking ${bookingToCancel.bookingId} has been cancelled successfully!`);
      }, 100);
    }
  };

  const confirmEdit = () => {
    if (bookingToEdit && editEndTime) {
      const newEndTime = new Date(editEndTime);
      const startTime = new Date(bookingToEdit.startTime);
      
      if (newEndTime <= startTime) {
        alert("End time must be after start time!");
        return;
      }

      // Calculate new amount based on duration
      const durationMs = newEndTime - startTime;
      const durationHours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
      const baseRates = { Car: 50, Bike: 20, Truck: 100, SUV: 70 };
      const newAmount = baseRates[bookingToEdit.vehicle] * durationHours;

      setBookings(prev => prev.map(booking => 
        booking.id === bookingToEdit.id 
          ? { ...booking, endTime: editEndTime, amount: newAmount }
          : booking
      ));
      
      setShowEditPopup(false);
      setBookingToEdit(null);
      
      // Show success message
      setTimeout(() => {
        alert(`Booking ${bookingToEdit.bookingId} has been updated successfully!`);
      }, 100);
    }
  };

  const cancelCancel = () => {
    setShowCancelPopup(false);
    setBookingToCancel(null);
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setBookingToEdit(null);
  };

  const downloadReceipt = (booking) => {
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Parking Receipt - ${booking.bookingId}</title>
        <style>
          body { 
            font-family: 'Poppins', sans-serif; 
            max-width: 500px; 
            margin: 0 auto; 
            padding: 30px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .receipt-container { 
            background: rgba(255,255,255,0.95); 
            padding: 30px; 
            border-radius: 20px; 
            color: #333;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #667eea;
            padding-bottom: 20px;
          }
          .logo { 
            font-size: 28px; 
            font-weight: bold; 
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
          }
          .booking-id { 
            color: #48c78e; 
            font-weight: bold; 
            font-size: 18px;
          }
          .details-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 25px;
          }
          .detail-item { margin-bottom: 12px; }
          .label { 
            color: #666; 
            font-size: 14px; 
            margin-bottom: 5px;
          }
          .value { 
            font-weight: 600; 
            font-size: 16px;
          }
          .amount { 
            color: #48c78e; 
            font-size: 20px; 
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
          }
          .qr-code { 
            text-align: center; 
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="logo">AutoTech Parking</div>
            <div class="booking-id">${booking.bookingId}</div>
            <div style="color: #48c78e; font-weight: 600;">Booking Confirmed</div>
          </div>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="label">Location</div>
              <div class="value">${booking.place}</div>
            </div>
            <div class="detail-item">
              <div class="label">Vehicle Type</div>
              <div class="value">${booking.vehicle}</div>
            </div>
            <div class="detail-item">
              <div class="label">Parking Slot</div>
              <div class="value">${booking.selectedSlot}</div>
            </div>
            <div class="detail-item">
              <div class="label">Start Time</div>
              <div class="value">${new Date(booking.startTime).toLocaleString()}</div>
            </div>
            <div class="detail-item">
              <div class="label">End Time</div>
              <div class="value">${new Date(booking.endTime).toLocaleString()}</div>
            </div>
            <div class="detail-item">
              <div class="label">Duration</div>
              <div class="value">${Math.ceil((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60))} hours</div>
            </div>
          </div>

          <div class="amount">Total Paid: ₹${booking.amount}</div>

          <div class="qr-code">
            <div style="margin-bottom: 10px; font-weight: 600;">Parking QR Code</div>
            <img src="${document.querySelector(`#qr-${booking.id}`)?.toDataURL()}" 
                 style="width: 150px; height: 150px; border: 1px solid #ddd; padding: 10px;" />
            <div style="font-size: 11px; color: #666; margin-top: 5px;">
              Valid until: ${new Date(booking.endTime).toLocaleDateString()}
            </div>
          </div>

          <div class="footer">
            <div>Thank you for choosing AutoTech Parking</div>
            <div>Contact: support@autotech.com | Phone: +91-9876543210</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${booking.bookingId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate minimum end time for editing (1 hour after start time)
  const getMinEditEndTime = () => {
    if (!bookingToEdit?.startTime) return new Date().toISOString().slice(0, 16);
    const start = new Date(bookingToEdit.startTime);
    start.setHours(start.getHours() + 1);
    return start.toISOString().slice(0, 16);
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: backgroundGradient,
      fontFamily: "'Poppins', sans-serif",
      paddingTop: "80px",
      position: "relative",
      transition: "all 0.5s ease"
    }}>
      <Navbar />
      
      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "2000",
          backdropFilter: "blur(5px)"
        }}>
          <div style={{
            background: isDark ? "rgba(30, 30, 45, 0.95)" : "rgba(255, 255, 255, 0.95)",
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            backdropFilter: "blur(15px)",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.2)",
            color: isDark ? "#ffffff" : "#333333"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⚠️</div>
            <h3 style={{ marginBottom: "15px", fontSize: "1.4rem" }}>
              Cancel Booking?
            </h3>
            <p style={{ marginBottom: "25px", lineHeight: "1.5", color: isDark ? "rgba(255,255,255,0.8)" : "#666" }}>
              Are you sure you want to cancel booking <strong>{bookingToCancel?.bookingId}</strong> for {bookingToCancel?.place}?
            </p>
            <p style={{ color: "#ff6b6b", fontSize: "0.9rem", marginBottom: "30px", fontWeight: "500" }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button
                onClick={cancelCancel}
                style={{
                  padding: "12px 30px",
                  background: "transparent",
                  color: isDark ? "#ff6b6b" : "#667eea",
                  border: `2px solid ${isDark ? "#ff6b6b" : "#667eea"}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = isDark ? "#ff6b6b" : "#667eea";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = isDark ? "#ff6b6b" : "#667eea";
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: "12px 30px",
                  background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(255,107,107,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Popup */}
      {showEditPopup && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "2000",
          backdropFilter: "blur(5px)"
        }}>
          <div style={{
            background: isDark ? "rgba(30, 30, 45, 0.95)" : "rgba(255, 255, 255, 0.95)",
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "450px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            backdropFilter: "blur(15px)",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.2)",
            color: isDark ? "#ffffff" : "#333333"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✏️</div>
            <h3 style={{ marginBottom: "15px", fontSize: "1.4rem" }}>
              Extend Booking
            </h3>
            <p style={{ marginBottom: "20px", lineHeight: "1.5", color: isDark ? "rgba(255,255,255,0.8)" : "#666" }}>
              Extend your parking time for <strong>{bookingToEdit?.place}</strong>
            </p>
            
            <div style={{ textAlign: "left", marginBottom: "25px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}>
                Current End Time
              </label>
              <div style={{ 
                background: isDark ? "rgba(255,255,255,0.1)" : "#f8f9fa", 
                padding: "12px", 
                borderRadius: "8px",
                marginBottom: "15px",
                fontSize: "0.9rem",
                color: isDark ? "rgba(255,255,255,0.8)" : "#666"
              }}>
                {bookingToEdit && new Date(bookingToEdit.endTime).toLocaleString()}
              </div>

              <label style={{ 
                display: "block", 
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}>
                New End Time *
              </label>
              <input
                type="datetime-local"
                value={editEndTime}
                onChange={(e) => setEditEndTime(e.target.value)}
                min={getMinEditEndTime()}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `2px solid ${isDark ? "#333344" : "#e0e0e0"}`,
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  backgroundColor: isDark ? "#1a1a2e" : "white",
                  color: isDark ? "#ffffff" : "#333333",
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button
                onClick={cancelEdit}
                style={{
                  padding: "12px 30px",
                  background: "transparent",
                  color: isDark ? "#ff6b6b" : "#667eea",
                  border: `2px solid ${isDark ? "#ff6b6b" : "#667eea"}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = isDark ? "#ff6b6b" : "#667eea";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = isDark ? "#ff6b6b" : "#667eea";
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmEdit}
                style={{
                  padding: "12px 30px",
                  background: isDark 
                    ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                    : "linear-gradient(135deg, #48c78e, #20c997)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = isDark 
                    ? "0 8px 20px rgba(255,107,107,0.4)" 
                    : "0 8px 20px rgba(72, 199, 142, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Update Booking
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div style={{
        maxWidth: "1200px",
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
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div style={{
            background: cardBg,
            padding: "60px",
            borderRadius: "20px",
            textAlign: "center",
            backdropFilter: "blur(15px)",
            border: isDark 
              ? "1px solid rgba(255,255,255,0.1)" 
              : "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.5s ease"
          }}>
            <h2 style={{ color: textColor, marginBottom: "20px" }}>No Bookings Yet</h2>
            <p style={{ color: secondaryTextColor, marginBottom: "30px" }}>
              You haven't made any bookings yet. Start by booking your first parking slot!
            </p>
            <button
              onClick={() => navigate("/booking")}
              style={{
                background: isDark 
                  ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)" 
                  : "linear-gradient(135deg, #48c78e, #20c997)",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = isDark 
                  ? "0 10px 25px rgba(255,107,107,0.4)" 
                  : "0 10px 25px rgba(72, 199, 142, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Book Your First Slot
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"
          }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{
                background: cardBg,
                padding: "30px",
                borderRadius: "20px",
                backdropFilter: "blur(15px)",
                border: isDark 
                  ? "1px solid rgba(255,255,255,0.1)" 
                  : "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: "translateY(0)",
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
                {/* Booking Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px"
                }}>
                  <div>
                    <h3 style={{ color: textColor, margin: "0 0 5px 0", fontSize: "1.3rem" }}>
                      {booking.place}
                    </h3>
                    <p style={{ color: "#48c78e", margin: "0", fontWeight: "600" }}>
                      {booking.bookingId}
                    </p>
                  </div>
                  <span style={{
                    background: "#48c78e",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: "500"
                  }}>
                    {booking.status}
                  </span>
                </div>

                {/* QR Code */}
                <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  marginBottom: "20px"
                }}>
                  <h4 style={{ color: "#333", marginBottom: "15px" }}>Parking QR Code</h4>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <QRCodeCanvas 
                      id={`qr-${booking.id}`}
                      value={generateQRData(booking)} 
                      size={150}
                      bgColor="#ffffff"
                      fgColor="#333333"
                      level="H"
                    />
                  </div>
                  <p style={{ color: "#666", fontSize: "0.8rem", margin: "0" }}>
                    Scan at entry • Valid until: {new Date(booking.endTime).toLocaleString()}
                  </p>
                </div>

                {/* Booking Details */}
                <div style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        Vehicle
                      </p>
                      <p style={{ color: textColor, margin: "0", fontWeight: "500" }}>
                        {booking.vehicle}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        Slot
                      </p>
                      <p style={{ color: textColor, margin: "0", fontWeight: "500" }}>
                        {booking.selectedSlot}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        Start Time
                      </p>
                      <p style={{ color: textColor, margin: "0", fontWeight: "500" }}>
                        {new Date(booking.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        End Time
                      </p>
                      <p style={{ color: textColor, margin: "0", fontWeight: "500" }}>
                        {new Date(booking.endTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        Duration
                      </p>
                      <p style={{ color: textColor, margin: "0", fontWeight: "500" }}>
                        {Math.ceil((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60))} hours
                      </p>
                    </div>
                    <div>
                      <p style={{ color: secondaryTextColor, margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        Amount
                      </p>
                      <p style={{ color: "#48c78e", margin: "0", fontWeight: "600" }}>
                        ₹{booking.amount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => downloadReceipt(booking)}
                    style={{
                      flex: "1",
                      background: isDark 
                        ? "linear-gradient(135deg, #667eea, #764ba2)" 
                        : "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = isDark 
                        ? "0 5px 15px rgba(102,126,234,0.4)" 
                        : "0 5px 15px rgba(102,126,234,0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    📄 Download Receipt
                  </button>
                  <button
                    onClick={() => handleEditClick(booking)}
                    style={{
                      flex: "1",
                      background: isDark 
                        ? "linear-gradient(135deg, #ffa726, #ff9800)" 
                        : "linear-gradient(135deg, #ffa726, #ff9800)",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = isDark 
                        ? "0 5px 15px rgba(255,167,38,0.4)" 
                        : "0 5px 15px rgba(255,167,38,0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    ✏️ Extend Time
                  </button>
                  <button
                    onClick={() => handleCancelClick(booking)}
                    style={{
                      flex: "1",
                      background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
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
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}