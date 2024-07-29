import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../updateState";

const initialState = {
  loading: false,
  error: null,
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      switch (action.payload.type) {
        case "GET_USER_REQUEST":
          return updateState(state, { loading: true });
        case "GET_USER_SUCCESS":
          // console.log(action.payload.data.data);
          return updateState(state, {
            loading: false,
            user: action.payload.data.data,
          });
        case "GET_USER_FAIL":
          return updateState(
            {},
            {
              loading: false,
              error: action.payload.error,
            }
          );
        case "USER_LOGOUT":
          return initialState;
        default:
          return state;
      }
    },
    updatePassword: (state, action) => {
      switch (action.payload.type) {
        case "UPDATE_PASS_REQUEST":
          return updateState(state, { loading: true });
        case "UPDATE_PASS_SUCCESS":
          return updateState(state, {
            loading: false,
            isPassChange: action.payload.data.success,
            error: action.payload.message ? action.payload.message : null,
          });
        case "UPDATE_PASS_FAIL":
          return updateState(
            {},
            {
              loading: false,
              error: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
  },
});

export const { getUserInfo, updatePassword } = userSlice.actions;
export default userSlice.reducer;
