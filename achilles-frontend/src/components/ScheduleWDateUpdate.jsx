import { useState } from "react";
import { TableCell, Button } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const ScheduleWDateUpdate = ({ schedule, handleChangeEndDate }) => {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [recurringEndDate, setRecurringEndDate] = useState(dayjs(schedule.end));

  return (
    <>
      <TableCell>
        {dayjs(schedule.start).format("MMMM D, YYYY")} -{" "}
        {dayjs(schedule.end).format("MMMM D, YYYY")}
      </TableCell>
      {datePickerIsOpen && (
        <TableCell>
          <DatePicker
            label="end"
            required
            value={recurringEndDate}
            minDate={dayjs()}
            onChange={(newValue) => setRecurringEndDate(newValue)}
          />
        </TableCell>
      )}
      <TableCell>
        {schedule.monday ? "Mon " : ""}
        {schedule.tuesday ? "Tue " : ""}
        {schedule.wednesday ? "Wed " : ""}
        {schedule.thursday ? "Thu " : ""}
        {schedule.friday ? "Fri " : ""}
        {schedule.saturday ? "Sat " : ""}
        {schedule.sunday ? "Sun " : ""}
      </TableCell>
      <TableCell>
        {schedule.groupsForEvent.map((group) => group.name).join(", ")}
      </TableCell>
      <TableCell>
        {datePickerIsOpen ? (
          <>
            <Button
              variant="contained"
              onClick={() => {
                handleChangeEndDate(
                  schedule.id,
                  schedule.end,
                  recurringEndDate,
                );
                setDatePickerIsOpen(false);
              }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDatePickerIsOpen(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setDatePickerIsOpen(true)}>
            Change End Date
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default ScheduleWDateUpdate;
