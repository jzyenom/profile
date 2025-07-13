import { motion } from "framer-motion";
import "./UserInfo.css";

const UserInfo = ({ user }) => {

    const formattedLastLogin = new Date(user.lastLogin).toLocaleString();
  return (
    <motion.div
      className="user-info-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="user-info-card">
        <h2 className="title">User Information</h2>
        <div className="user-info-grid">
          <div>
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          <div>
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div>
            <strong>Role:</strong> <span>{user.role}</span>
          </div>
          <div>
            <strong>Last Login:</strong> <span>{formattedLastLogin}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfo;
