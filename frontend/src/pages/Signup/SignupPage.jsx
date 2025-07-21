import { motion } from "framer-motion";
import { User, Mail, Lock, Loader, RollerCoaster } from "lucide-react";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrentgthMeter from "../../components/PasswordStrengthMeter/PasswordStrentgthMeter";
import { useAuthStore } from "../../store/authStore";
import "./Signup.css"; // <-- make sure this is present

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("guest");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signup(email, password, name, role);
      console.log("Signup response:", res); // Should show user info

      // navigate("/verify-email");
      navigate("/login");
    } catch (err) {
      console.log("Signup error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="signup-container"
    >
      <div className="signup-form">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {false && (
            <Input
              icon={RollerCoaster}
              type="text"
              placeholder="Role"
              value={role}
              disabled
              onChange={(e) => setRole(e.target.value)}
            />
          )}
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrentgthMeter password={password} />

          {error && <p className="signup-error">{error}</p>}

          <motion.button
            className="signup-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="loader-icon" /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="signup-footer">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
