import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../store/actions/loginAction";
import "../css/Login.css";
// import "../css/Home.css";
import { getToken } from "../utils/utils";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const { loading, error, success: loginSuccess } = loginState;

  useEffect(() => {
    if (loginSuccess && getToken()) {
      navigate("/home");
    }
  }, [loginSuccess]);

  const submitLoginHandler = (e) => {
    e.preventDefault();
    let loginData;
    loginData = {
      username,
      password,
    };
    dispatch(login(loginData));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="body-container">
      <section className="main-container">
        <form className="login-container" onSubmit={submitLoginHandler}>
          <h1>Login</h1>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              className="inputbox-box"
              type="text"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="spacer" htmlFor="email">
              Email
            </label>
          </div>
          <div className="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              className="inputbox-box"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="spacer" htmlFor="password">
              Password
            </label>
          </div>
          <div className="forget">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#"> Forgot Password</a>
          </div>
          <button className="login-btn">Login In</button>
          <div className="register">
            <p>
              Don't have an account? <Link to="/signup">Register here</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
