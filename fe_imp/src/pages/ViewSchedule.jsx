import { useEffect, useState } from "react";
import "../css/Home.css";
import Header from "../components/Header";
import JsonTable from "../components/JsonTable";
import ScheduleList from "./ScheduleList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserShedule } from "../store/actions/scheduleAction";
import { getUser } from "../store/actions/loginAction";

export const ViewSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableId, setTableId] = useState("");
  const userState = useSelector((state) => state.user);
  const { user } = userState; // make if to navigate to login
  const userSchdState = useSelector((state) => state.userSchd);
  const { data, loading, success } = userSchdState;

  useEffect(() => {
    if (userState && !user) {
      dispatch(getUser());
    }
  }, [user]);
  useEffect(() => {
    console.log(data);
  }, [userSchdState]);
  useEffect(() => {
    console.log(tableId);
    if (user && tableId) {
      dispatch(getUserShedule(tableId, user.user_id));
    }
  }, [tableId]);
  return (
    <div className="home-container">
      {user && <Header user={user} />}
      <div className="sec-container">
        <ScheduleList settableId={(id) => setTableId(id)} isAdmin={false} />
        <div className="main-content">{data && <JsonTable data={data} />}</div>
      </div>
    </div>
  );
};
