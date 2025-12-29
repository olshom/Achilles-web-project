import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { useSelector, useDispatch } from "react-redux";
import { initializeGroups } from "../reducers/groupsReducer.js";
import eventsService from "../services/events.js";
import { initializeUsers } from "../reducers/usersReducer.js";
import { selectUsersByRole } from "../selectors/usersSelectors.js";

const EventForm = ({ initValues, isEvent, onEventCreated, onCancel }) => {
  const [title, setTitle] = useState(initValues?.title || "");
  /*
    const [eventType, setEventType] = useState(isEvent ? 'recurring' : 'one-time');
*/
  const [eventDate, setEventDate] = useState(
    dayjs(initValues?.start) || dayjs(),
  );
  const [startEventTime, setStartEventTime] = useState(
    dayjs(initValues?.start) || dayjs(),
  );
  const [endEventTime, setEndEventTime] = useState(
    dayjs(initValues?.end) || dayjs(),
  );
  const [recurringDays, setRecurringDays] = useState([]);
  const [recurringStartDate, setRecurringStartDate] = useState(dayjs());
  const [recurringEndDate, setRecurringEndDate] = useState(dayjs());
  const [selectedGroups, setSelectedGroups] = useState(
    initValues?.groups.map((group) => group.id) || [],
  );
  const [coach, setCoach] = useState(initValues?.coachId || "");
  const [uniform, setUniform] = useState(initValues?.uniform || "Gi");
  const [description, setDescription] = useState(initValues?.description || "");

  const uniforms = ["Gi", "No-Gi", "Gi & No-Gi"];

  const groups = useSelector((state) => state.groups);
  const role = "coach";
  const memoizedCoaches = useMemo(() => selectUsersByRole(role), [role]);
  const coaches = useSelector((state) => memoizedCoaches(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeGroups());
    dispatch(initializeUsers());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      title,
      coach,
      selectedGroups,
      description,
      uniform,
      startTime: startEventTime.format("HH:mm"),
      endTime: endEventTime.format("HH:mm"),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    if (isEvent) {
      newEvent.date = eventDate;
    } else {
      newEvent.recurringDays = recurringDays;
      newEvent.recurringStartDate = recurringStartDate;
      newEvent.recurringEndDate = recurringEndDate;
    }
    await eventsService.postEvent(newEvent);
    onEventCreated();
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const updatedEvent = {
      title,
      coach,
      selectedGroups,
      description,
      uniform,
      startTime: startEventTime.format("HH:mm"),
      endTime: endEventTime.format("HH:mm"),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      date: eventDate,
    };

    await eventsService.updateEvent(initValues.id, updatedEvent);
    onEventCreated();
  };

  return (
    <Paper style={{ padding: "2rem" }}>
      <h2>Create Training Event</h2>
      <form onSubmit={initValues ? handleSubmitUpdate : handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={(e) => {
            console.log("e target", e.target);
            setTitle(e.target.value);
          }}
          fullWidth
          required
          style={{ marginBottom: "1rem" }}
        />
        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel>Coach</InputLabel>
          <Select value={coach} onChange={(e) => setCoach(e.target.value)}>
            {coaches.map((coach) => (
              <MenuItem key={coach.id} value={coach.id}>
                {coach.firstName} {coach.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel>Assign to Group</InputLabel>
          <Select
            multiple
            value={selectedGroups}
            onChange={(e) => setSelectedGroups(e.target.value)}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel>Uniform</InputLabel>
          <Select value={uniform} onChange={(e) => setUniform(e.target.value)}>
            {uniforms.map((uni) => (
              <MenuItem key={uni} value={uni}>
                {uni}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        ></TextField>
        {isEvent ? (
          <Stack spacing={2} sx={{ minWidth: 305 }}>
            <DatePicker
              label="start"
              required
              value={eventDate}
              onChange={(newValue) => setEventDate(newValue)}
            />
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ minWidth: 305 }}>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <InputLabel>Repeat on Days</InputLabel>
              <Select
                multiple
                value={recurringDays}
                onChange={(e) => setRecurringDays(e.target.value)}
              >
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={2}>Tuesday</MenuItem>
                <MenuItem value={3}>Wednesday</MenuItem>
                <MenuItem value={4}>Thursday</MenuItem>
                <MenuItem value={5}>Friday</MenuItem>
                <MenuItem value={6}>Saturday</MenuItem>
                <MenuItem value={0}>Sunday</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="start"
              required
              value={recurringStartDate}
              onChange={(newValue) => setRecurringStartDate(newValue)}
            />

            <DatePicker
              label="end"
              required
              value={recurringEndDate}
              onChange={(newValue) => setRecurringEndDate(newValue)}
            />
          </Stack>
        )}
        <TimePicker
          label="start"
          required
          value={startEventTime}
          onChange={(newValue) => setStartEventTime(newValue)}
        />

        <TimePicker
          label="end"
          value={endEventTime}
          onChange={(newValue) => setEndEventTime(newValue)}
        />
        <Button type="submit" variant="contained" color="primary">
          {initValues ? "Update Event" : "Create Event"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          cancel
        </Button>
      </form>
    </Paper>
  );
};

export default EventForm;
