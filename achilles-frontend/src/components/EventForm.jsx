import { Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, Stack } from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {TimePicker, DatePicker} from "@mui/x-date-pickers";
import {useSelector, useDispatch} from "react-redux";
import {initializeGroups} from "../reducers/groupsReducer.js";
import eventsService from "../services/events.js";
import {initializeUsers} from "../reducers/usersReducer.js";
import {selectUsersByRole} from "../selectors/usersSelectors.js";

const EventForm = ({onEventCreated, onCancel}) => {
    const [title, setTitle] = useState('');
    const [eventType, setEventType] = useState('one-time');
    const [eventDate, setEventDate] = useState(dayjs());
    const [startEventTime, setStartEventTime] = useState(dayjs());
    const [endEventTime, setEndEventTime] = useState(dayjs());
    const [recurringDays, setRecurringDays] = useState([]);
    const [recurringStartDate, setRecurringStartDate] = useState(dayjs());
    const [recurringEndDate, setRecurringEndDate] = useState(dayjs());
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [coach, setCoach] = useState('');
    const [uniform, setUniform] = useState('');
    const [description, setDescription] = useState('');

    const uniforms = ['Gi', 'No-Gi', 'Gi & No-Gi'];

    const groups = useSelector(state => state.groups);
    const role = 'coach';
    const memoizedCoaches = useMemo(() => selectUsersByRole(role), [role]);
    const coaches = useSelector(state => memoizedCoaches(state));
    console.log("coaches", coaches);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeGroups())
        dispatch(initializeUsers())
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEvent = {
            title,
            eventType,
            coach,
            selectedGroups,
            timeZone:  Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        if (eventType === 'one-time') {
            newEvent.isRecurring = false;
            newEvent.date = eventDate;
            newEvent.startTime = startEventTime.format('HH:mm');
            newEvent.endTime = endEventTime.format('HH:mm');
            newEvent.uniform = uniform;
            newEvent.description = description;
        } else if (eventType === 'recurring') {
            newEvent.isRecurring = true;
            newEvent.recurringDays = recurringDays;
            newEvent.recurringStartDate = recurringStartDate;
            newEvent.recurringEndDate = recurringEndDate;
            newEvent.startTime = startEventTime.format('HH:mm');
            newEvent.endTime = endEventTime.format('HH:mm');
        }
        await eventsService.postEvent(newEvent);
        console.log('Creating event:', newEvent);
        onEventCreated();
    }

    return (
        <Paper style={{ padding: '2rem' }}>
            <h2>Create Training Event</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    style={{ marginBottom: '1rem' }}
                />
                <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                    <InputLabel>Event Type</InputLabel>
                    <Select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <MenuItem value="one-time">One-Time Event</MenuItem>
                        <MenuItem value="recurring">Recurring Event</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                    <InputLabel>Coach</InputLabel>
                    <Select
                        value={coach}
                        onChange={(e) => setCoach(e.target.value)}
                    >
                        {coaches.map((coach) => (
                            <MenuItem key={coach.id} value={coach.id}>
                                {coach.firstName} {coach.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '1rem' }}>
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


                {eventType === 'one-time' ? (
                    <Stack spacing={2} sx={{ minWidth: 305 }}>
                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel>Uniform</InputLabel>
                            <Select value={uniform} onChange={(e) => setUniform(e.target.value)}>
                                {uniforms.map((uni) => (
                                <MenuItem key={uni} value={uni}>
                                    {uni}
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DatePicker
                            label="start"
                            required
                            value={eventDate}
                            onChange={(newValue) =>setEventDate(newValue)}
                        />

                        <TimePicker
                            label="start"
                            required
                            value={startEventTime}
                            onChange={(newValue) =>setStartEventTime(newValue)}
                        />

                        <TimePicker
                            label="end"
                            value={endEventTime}
                            onChange={(newValue) =>setEndEventTime(newValue)}
                        />

                        <TextField
                            label="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                        ></TextField>
                    </Stack>
                ) : (
                    <Stack spacing={2} sx={{ minWidth: 305 }}>
                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
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
                            onChange={(newValue) =>setRecurringStartDate(newValue)}
                        />

                        <DatePicker
                            label="end"
                            required
                            value={recurringEndDate}
                            onChange={(newValue) =>setRecurringEndDate(newValue)}
                        />

                        <TimePicker
                            label="start"
                            required
                            value={startEventTime}
                            onChange={(newValue) =>setStartEventTime(newValue)}
                        />

                        <TimePicker
                            label="end"
                            value={endEventTime}
                            onChange={(newValue) =>setEndEventTime(newValue)}
                        />
                    </Stack>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Create Event
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    cancel
                </Button>
            </form>
        </Paper>
    )
}

export default EventForm;