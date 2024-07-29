import axios from "../../axios";
import { userLogin } from "../slices/loginSlice";
import { getUserInfo, updatePassword } from "../slices/userSlice";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch(
      userLogin({
        type: "USER_LOGIN_REQUEST",
      })
    );
    const { data } = await axios.post("/auth/login", loginData);
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 120);
    cookies.set("attedanceToken", data.token, {
      path: "/",
      expires: expDate,
    });
    dispatch(
      userLogin({
        type: "USER_LOGIN_SUCCESS",
        data,
      })
    );
    // window.location.reload();
  } catch (error) {
    dispatch(
      userLogin({
        type: "USER_LOGIN_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const logout = () => async (dispatch) => {
  dispatch(getUserInfo({ type: "USER_LOGOUT" }));
  dispatch(userLogin({ type: "USER_LOGOUT" }));
  cookies.remove("attedanceToken");
  window.location.reload();
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(
      getUserInfo({
        type: "GET_USER_REQUEST",
      })
    );
    const { data } = await axios.get("/auth/me");

    dispatch(
      getUserInfo({
        type: "GET_USER_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      getUserInfo({
        type: "GET_USER_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const changePassword = (updateData) => async (dispatch) => {
  try {
    dispatch(
      updatePassword({
        type: "UPDATE_PASS_REQUEST",
      })
    );
    const { data } = await axios.put("/auth/updatepassword", updateData);
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 120);
    cookies.set("attedanceToken", data.token, {
      path: "/",
      expires: expDate,
    });
    dispatch(
      updatePassword({
        type: "UPDATE_PASS_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      updatePassword({
        type: "UPDATE_PASS_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
