import { updateState } from "../updateState";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  user: null,
  GAUError: null,
  GAULoading: false,
  CUError: null,
  CULoading: false,
  CUSuccess: false,
  UUError: null,
  UULoading: false,
  UUSuccess: false,
  DUError: null,
  DULoading: false,
  DUSuccess: false,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      switch (action.payload.type) {
        case "GET_USERS_REQUEST":
          return updateState(state, { GAULoading: true });
        case "GET_USERS_SUCCESS":
          return updateState(state, {
            users: action.payload.data.data,
            GAUError: action.payload.message ? action.payload.message : null,
            CUSuccess: false,
          });
        case "GET_USERS_FAIL":
          return updateState(
            {},
            {
              users: null,
              GAUError: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
    createUserSlice: (state, action) => {
      switch (action.payload.type) {
        case "CREATE_USER_REQUEST":
          return updateState(state, { CULoading: true });
        case "CREATE_USER_SUCCESS":
          return updateState(state, {
            user: action.payload.data.data,
            CULoading: false,
            CUSuccess: action.payload.data.success,
          });
        case "CREATE_USER_FAIL":
          return updateState(
            {},
            {
              CUSuccess: false,
              user: null,
              error: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
    updateUserSlice: (state, action) => {
      switch (action.payload.type) {
        case "UPDATE_USER_REQUEST":
          return updateState(state, { UULoading: true });
        case "UPDATE_USER_SUCCESS":
          return updateState(state, {
            UULoading: false,
            UUSuccess: action.payload.data.success,
            user: action.payload.data.data,
          });
        case "UPDATE_USER_FAIL":
          return updateState(
            {},
            {
              user: null,
              UUSuccess: false,
              UUError: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
    deleteUserSlice: (state, action) => {
      switch (action.payload.type) {
        case "DELETE_USER_REQUEST":
          return updateState(state, { DULoading: true });
        case "DELETE_USER_SUCCESS":
          return updateState(state, {
            DULoading: false,
            DUSuccess: action.payload.data.success,
            DUError: action.payload.message ? action.payload.message : null,
          });
        case "DELETE_USER_FAIL":
          return updateState(
            {},
            {
              DUSuccess: false,
              DUError: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
  },
});

export const {
  getAllUsers,
  createUserSlice,
  updateUserSlice,
  deleteUserSlice,
} = usersSlice.actions;
export default usersSlice.reducer;
