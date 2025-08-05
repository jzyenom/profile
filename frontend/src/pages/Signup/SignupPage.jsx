// import { motion } from "framer-motion";
// import { User, Mail, Lock, Loader, RollerCoaster } from "lucide-react";
// import Input from "../../components/Input/Input";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import PasswordStrentgthMeter from "../../components/PasswordStrengthMeter/PasswordStrentgthMeter";
// import { useAuthStore } from "../../store/authStore";
// import "./Signup.css"; // <-- make sure this is present

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const { signup, error, isLoading } = useAuthStore();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("guest");
//   const [password, setPassword] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await signup(email, password, name, role);
//       console.log("Signup response:", res); // Should show user info

//       // navigate("/verify-email");
//       navigate("/login");
//     } catch (err) {
//       console.log("Signup error:", err);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="signup-container"
//     >
//       <div className="signup-form">
//         <h2 className="signup-title">Create Account</h2>

//         <form onSubmit={handleSignup}>
//           <Input
//             icon={User}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <Input
//             icon={Mail}
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {false && (
//             <Input
//               icon={RollerCoaster}
//               type="text"
//               placeholder="Role"
//               value={role}
//               disabled
//               onChange={(e) => setRole(e.target.value)}
//             />
//           )}
//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <PasswordStrentgthMeter password={password} />

//           {error && <p className="signup-error">{error}</p>}

//           <motion.button
//             className="signup-button"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? <Loader className="loader-icon" /> : "Sign Up"}
//           </motion.button>
//         </form>
//       </div>
//       <div className="signup-footer">
//         <p>
//           Already have an account?{" "}
//           <Link to="/login" className="login-link">
//             Login
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default SignupPage;

import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Loader,
  Phone,
  Landmark,
  Banknote,
  Globe,
  MapPin,
  Map,
} from "lucide-react";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrentgthMeter from "../../components/PasswordStrengthMeter/PasswordStrentgthMeter";
import { useAuthStore } from "../../store/authStore";
import "./Signup.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [pollingUnit, setPollingUnit] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        password,
        phone,
        bankName,
        bankAccountNumber,
        gender,
        state,
        lga,
        pollingUnit,
      };

      const res = await signup(userData);
      console.log("Signup response:", res);

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
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrentgthMeter password={password} />

          <Input
            icon={Phone}
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            icon={Banknote}
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <Input
            icon={Landmark}
            type="text"
            placeholder="Bank Account Number"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
          />

          <Input
            icon={Globe}
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <Input
            icon={Map}
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Input
            icon={MapPin}
            type="text"
            placeholder="LGA"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
          />
          <Input
            icon={Map}
            type="text"
            placeholder="Polling Unit"
            value={pollingUnit}
            onChange={(e) => setPollingUnit(e.target.value)}
          />

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
