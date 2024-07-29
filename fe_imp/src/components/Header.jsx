import React from "react";
import "../css/Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/loginAction";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <header>
      <h2 className="logo">Schedule</h2>
      <nav>
        <div className="name-container">
          <div className="username">{user.name}</div>
          {user.role === "admin" && <div className="admin-info">admin</div>}
        </div>
        {user.role === "admin" && (
          <Link className="user-btn" to="/user">
            User
          </Link>
        )}
        <button className="logout-btn" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
