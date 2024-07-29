import { updateState } from "../updateState";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: [],
  loadingGet: false,
  errorGet: null,
  successGet: false,
  loadingDelete: false,
  errorDelete: null,
  successDelete: false,
};

const userScheduleIS = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    getAllSchedules: (state, action) => {
      switch (action.payload.type) {
        case "GET_SCHEDULES_REQUEST":
          return updateState(state, { loadingGet: true });
        case "GET_SCHEDULES_SUCCESS":
          return updateState(state, {
            loadingGet: false,
            schedules: action.payload.data.data,
            successGet: action.payload.data.success,
          });
        case "GET_SCHEDULES_FAIL":
          return updateState(
            {},
            {
              schedules: [],
              successGet: false,
              errorGet: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
    deleteScheduleSlice: (state, action) => {
      switch (action.payload.type) {
        case "DELETE_SCHEDULE_REQUEST":
          return updateState(state, { loadingDelete: true });
        case "DELETE_SCHEDULE_SUCCESS":
          return updateState(state, {
            loadingDelete: false,
            successDelete: action.payload.data.success,
          });
        case "DELETE_SCHEDULE_FAIL":
          return updateState(
            {},
            {
              successDelete: false,
              errorDelete: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
  },
});

const userSchdSlice = createSlice({
  name: "userSchd",
  initialState: userScheduleIS,
  reducers: {
    getUserSchd: (state, action) => {
      switch (action.payload.type) {
        case "GET_USERSCHD_REQUEST":
          return updateState(state, { loading: true });
        case "GET_USERSCHD_SUCCESS":
          return updateState(state, {
            loading: false,
            data: action.payload.data.data[0], //get only the first element
            success: action.payload.data.success,
          });
        case "GET_USERSCHD_FAIL":
          return updateState(
            {},
            {
              data: null,
              success: false,
              error: action.payload.error,
            }
          );
        default:
          return state;
      }
    },
  },
});

export const { getAllSchedules, deleteScheduleSlice } = scheduleSlice.actions;
export const { getUserSchd } = userSchdSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
export const userSchdReducer = userSchdSlice.reducer;
