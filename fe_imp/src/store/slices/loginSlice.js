import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      // console.log("Before mutation:", state);
      // console.log("Action:", action);

      switch (action.payload.type) {
        case "USER_LOGIN_REQUEST":
          state.loading = true;
          state.error = null;
          break;
        case "USER_LOGIN_SUCCESS":
          state.loading = false;
          state.success = action.payload.data.success;
          break;
        case "USER_LOGIN_FAIL":
          state.loading = false;
          state.error = action.payload.error;
          break;
        case "USER_LOGOUT":
          return initialState;
        default:
          return state;
      }
      // console.log("After mutation:", state);
    },
  },
});

export const { userLogin } = loginSlice.actions;
export default loginSlice.reducer;
