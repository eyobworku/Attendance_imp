import axios from "../../axios";
import {
  deleteScheduleSlice,
  getAllSchedules,
  getUserSchd,
} from "../slices/scheduleSlice";
export const getSchedules = () => async (dispatch) => {
  try {
    dispatch(
      getAllSchedules({
        type: "GET_SCHEDULES_REQUEST",
      })
    );
    const { data } = await axios.get("/tables");
    dispatch(
      getAllSchedules({
        type: "GET_SCHEDULES_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      getAllSchedules({
        type: "GET_SCHEDULES_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const deleteSchedule = (id, tablename) => async (dispatch) => {
  try {
    dispatch(
      deleteScheduleSlice({
        type: "DELETE_SCHEDULE_REQUEST",
      })
    );
    const { data } = await axios.delete(`/tables/${id}`, {
      data: { tablename },
    });
    dispatch(
      deleteScheduleSlice({
        type: "DELETE_SCHEDULE_SUCCESS",
        data,
      })
    );
  } catch (error) {
    dispatch(
      deleteScheduleSlice({
        type: "DELETE_SCHEDULE_FAIL",
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const getUserShedule = (tableId, userId) => async (dispatch) => {
  try {
    dispatch(
      getUserSchd({
        type: "GET_USERSCHD_REQUEST",
      })
    );
    const { data } = await axios.get(`/tables/${tableId}/${userId}`);
    dispatch(
      getUserSchd({
        type: "GET_USERSCHD_SUCCESS",
        data,
        error: null,
      })
    );
  } catch (error) {
    dispatch(
      getUserSchd({
        type: "GET_USERSCHD_FAIL",
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
