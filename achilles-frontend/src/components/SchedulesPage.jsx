import { useState, useEffect } from "react";
import schedulesService from "../services/schedules.js";
import Schedule from "./Schedule.jsx";

import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EventForm from "./EventForm.jsx";
import ScheduleWDateUpdate from "./ScheduleWDateUpdate.jsx";

const SchedulesPage = () => {
  const [notStartedSchedules, setNotStartedSchedules] = useState([]);
  const [activeSchedules, setActiveSchedules] = useState([]);
  const [endedSchedules, setEndedSchedules] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false);

  useEffect(() => {
    void fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    // Fetch schedules from the backend service
    const res = await schedulesService.getAll();
    setNotStartedSchedules(
      res.filter((schedule) => new Date(schedule.start) > new Date()),
    );
    setActiveSchedules(
      res.filter(
        (schedule) =>
          new Date(schedule.start) <= new Date() &&
          new Date(schedule.end) >= new Date(),
      ),
    );
    setEndedSchedules(
      res.filter((schedule) => new Date(schedule.end) < new Date()),
    );
  };

  const handleChangeEndDate = async (scheduleId, oldEndDate, newEndDate) => {
    console.log(
      "newEndDate",
      newEndDate.recurringEndDate,
      "type",
      typeof newEndDate.recurringEndDate,
    );
    console.log("oldEndDate", oldEndDate, "type", typeof oldEndDate);
    if (new Date(newEndDate) >= new Date(oldEndDate)) {
      alert(
        "Unfortunately, it is not possible to change the end date to a future date at the moment. Please create a new schedule instead.",
      );
      return;
    }
    const updatedSchedule = await schedulesService.updateSchedule(scheduleId, {
      newEndDate,
    });
    setActiveSchedules(
      activeSchedules.map((schedule) =>
        schedule.id !== updatedSchedule.id ? schedule : updatedSchedule,
      ),
    );
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm("Are you sure you want to delete this schedule?"))
      await schedulesService.deleteSchedule(scheduleId);
    setNotStartedSchedules(
      notStartedSchedules.filter((schedule) => schedule.id !== scheduleId),
    );
  };

  return (
    <div>
      {formIsVisible && (
        <EventForm
          initValues={null}
          isEvent={false}
          onEventCreated={() => {
            setFormIsVisible(false);
            void fetchSchedules();
          }}
          onCancel={() => setFormIsVisible(false)}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormIsVisible(true)}
        style={{ marginBottom: "1rem" }}
      >
        add new schedule
      </Button>
      <TableContainer component={Paper}>
        <h1>Active Schedules</h1>
        <Table>
          <TableBody>
            {activeSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <ScheduleWDateUpdate
                  key={schedule.id}
                  schedule={schedule}
                  handleChangeEndDate={handleChangeEndDate}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h1>Future Schedules</h1>
        <Table>
          <TableBody>
            {notStartedSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <Schedule
                  key={schedule.id}
                  schedule={schedule}
                  handleDeleteSchedule={handleDeleteSchedule}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h1>Ended Schedules</h1>
        <Table>
          <TableBody>
            {endedSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <Schedule key={schedule.id} schedule={schedule} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default SchedulesPage;
