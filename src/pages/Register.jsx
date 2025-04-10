import React, { useState } from "react";
import "./../components/AuthForm.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/register", formData);
      toast.success(res.data);
      setFormData({ email: "", password: "" });
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className="auth-container"
        style={{ filter: loading ? "blur(2px)" : "none" }}
      >
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            Register
          </button>
          <p className="redirect-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
