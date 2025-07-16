import { Check, X } from "lucide-react";
import "./PasswordStrengthMeter.css";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="criteria">
      {criteria.map((item) => (
        <div key={item.label} className="criteria-item">
          {item.met ? (
            <Check className="icon met" />
          ) : (
            <X className="icon unmet" />
          )}
          <span className={item.met ? "text-met" : "text-unmet"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = () => {
    if (strength === 0) return "very-weak";
    if (strength === 1) return "weak";
    if (strength === 2) return "fair";
    if (strength === 3) return "good";
    return "strong";
  };

  const strengthText = () => {
    if (strength === 0) return "Very weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="strength-meter">
      <div className="strength-header">
        <span className="strength-label">Password strength</span>
        <span className="strength-text">{strengthText()}</span>
      </div>
      <div className="strength-bars">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`strength-bar ${index < strength ? getColor() : "inactive"}`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
