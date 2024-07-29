import axios from "../../axios";
import {
  getAllUsers,
  createUserSlice,
  updateUserSlice,
  deleteUserSlice,
} from "../slices/usersSlice";
export const getUsers = () => async (dispatch) => {
  try {
    dispatch(
      getAllUsers({
        type: "GET_USERS_REQUEST",
      })
    );
    const { data } = await axios.get("/users");
    dispatch(
      getAllUsers({
        type: "GET_USERS_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      getAllUsers({
        type: "GET_USERS_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch(
      createUserSlice({
        type: "CREATE_USER_REQUEST",
      })
    );
    const { data } = await axios.post("/users", userData);
    dispatch(
      createUserSlice({
        type: "CREATE_USER_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      createUserSlice({
        type: "CREATE_USER_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(
      updateUserSlice({
        type: "UPDATE_USER_REQUEST",
      })
    );
    const { data } = await axios.put(`/users/${id}`, userData);
    dispatch(
      updateUserSlice({
        type: "UPDATE_USER_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      updateUserSlice({
        type: "UPDATE_USER_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(
      deleteUserSlice({
        type: "DELETE_USER_REQUEST",
      })
    );
    const { data } = await axios.delete(`/users/${id}`);
    dispatch(
      deleteUserSlice({
        type: "DELETE_USER_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      deleteUserSlice({
        type: "DELETE_USER_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

// export const getUsers = () => async (dispatch) => {
//     try {

//     } catch (error) {

//     }
// }
