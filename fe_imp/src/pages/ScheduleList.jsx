import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedules, deleteSchedule } from "../store/actions/scheduleAction";

const ScheduleComponent = ({ data, settableId, isAdmin }) => {
  const dispatch = useDispatch();
  const deleteSchTable = (id, tablename) => {
    dispatch(deleteSchedule(id, tablename));
    dispatch(getSchedules());
  };
  return (
    <div className="schedule-list">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((sched) => (
          <div
            className="schedule-item"
            key={sched.tablename}
            onClick={() => settableId(sched._id)}
          >
            <div className="schedule-name">{sched.tablename}</div>
            {isAdmin && (
              <div
                className="schedule-action"
                onClick={() => {
                  deleteSchTable(sched._id, sched.tablename);
                }}
              >
                x
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No schedules found</div>
      )}
    </div>
  );
};
const ScheduleList = ({ settableId, isAdmin }) => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedule); // Adjust the selector as necessary

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch, schedules]);

  return (
    <ScheduleComponent
      data={schedules}
      settableId={settableId}
      isAdmin={isAdmin}
    />
  );
};

export default ScheduleList;
