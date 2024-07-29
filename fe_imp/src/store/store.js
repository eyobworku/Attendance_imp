import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/usersSlice";
import tablesReducer from "./slices/tableSlice";
import { userSchdReducer, scheduleReducer } from "./slices/scheduleSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    tables: tablesReducer,
    users: usersReducer,
    schedule: scheduleReducer,
    userSchd: userSchdReducer,
  },
});
