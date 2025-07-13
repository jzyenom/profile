import React from "react";
import "./Input.css"; // <-- make sure this is present

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="input-wrapper">
      <div className="input-icon">
        <Icon className="icon" />
      </div>
      <input {...props} className="input-field" />
    </div>
  );
};

export default Input;
