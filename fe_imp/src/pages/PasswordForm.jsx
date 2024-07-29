import { useState, useEffect } from "react";
import "../css/Login.css";
import { changePassword, getUser } from "../store/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PasswordForm = () => {
  const userState = useSelector((state) => state.user);
  const { isPassChange } = userState;
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPassChange) {
      dispatch(getUser());
      navigate("/home");
    }
  }, [userState]);
  const submitUpdateHandler = (e) => {
    e.preventDefault();
    let updateData;
    updateData = {
      currentPassword: currentPass,
      newPassword: newPass,
    };
    dispatch(changePassword(updateData));
  };
  return (
    <div className="body-container">
      <section className="main-container">
        <form className="login-container" onSubmit={submitUpdateHandler}>
          <h1>Update Your Password</h1>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              className="inputbox-box"
              type="text"
              name="currPass"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
            <label className="spacer" htmlFor="currPass">
              Current Password
            </label>
          </div>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              className="inputbox-box"
              type="text"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <label className="spacer" htmlFor="newPass">
              New Password
            </label>
          </div>
          {/* <div className="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input className="inputbox-box" type="password" name="password" />
            <label className="spacer" htmlFor="password">
              Password
            </label>
          </div> */}
          <button className="login-btn">Update</button>
        </form>
      </section>
    </div>
  );
};

export default PasswordForm;
