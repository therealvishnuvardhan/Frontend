import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Full name is required";
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const { confirmPassword, ...submitData } = formData;
      
      const response = await fetch("https://auto-tech-code-babies.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        // Save user data to localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        
        alert("Account created successfully! ✅");
        navigate("/");
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

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
          Create Account
        </h2>

        <p style={{ 
          textAlign: "center", 
          color: "#666",
          marginBottom: "30px",
          fontSize: "16px"
        }}>
          Join AutoTech Parking today
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333"
            }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: `2px solid ${errors.name ? "#ff4444" : "#ddd"}`,
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "white"
              }}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span style={{ color: "#ff4444", fontSize: "14px", marginTop: "5px", display: "block" }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333"
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: `2px solid ${errors.email ? "#ff4444" : "#ddd"}`,
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "white"
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span style={{ color: "#ff4444", fontSize: "14px", marginTop: "5px", display: "block" }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333"
            }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: `2px solid ${errors.password ? "#ff4444" : "#ddd"}`,
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "white"
              }}
              placeholder="Enter your password (min. 6 characters)"
            />
            {errors.password && (
              <span style={{ color: "#ff4444", fontSize: "14px", marginTop: "5px", display: "block" }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "25px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333"
            }}>
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: `2px solid ${errors.confirmPassword ? "#ff4444" : "#ddd"}`,
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "white"
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={{ color: "#ff4444", fontSize: "14px", marginTop: "5px", display: "block" }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div style={{
              background: "rgba(255, 68, 68, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #ff4444",
              textAlign: "center"
            }}>
              <span style={{ color: "#ff4444", fontSize: "14px" }}>
                {errors.submit}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px 20px",
              backgroundColor: loading ? "#ccc" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              marginBottom: "20px"
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#5a6fd8";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#667eea";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#666" }}>
              Already have an account?{" "}
              <Link 
                to="/login" 
                style={{ 
                  color: "#28a745", 
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}