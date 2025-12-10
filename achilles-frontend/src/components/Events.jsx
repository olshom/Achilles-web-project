import {Button} from "@mui/material";
import EventForm from "./EventForm.jsx";
import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventsService from "../services/events.js";
import recurringEventsService from "../services/recurringEvents.js";
import Event from "./Event.jsx";
import {deleteEventAction} from "../reducers/eventsReducer.js";


const Events = () => {
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [isEventsFiltered, setIsEventsFiltered] = useState(false);
    const [eventWindowOpen, setEventWindowOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventPlain, setSelectedEventPlain] = useState(null);

    const dispatch = useDispatch();
    const calendarRef = useRef(null);
    const user = useSelector(state => state.user);
    console.log('user', user)

    const openEventFunctions = async(info) => {
        info.jsEvent.preventDefault();
        //open modal with 3 options delete, edit, delete all
        console.log('click is working', info.event.id);
        setSelectedEvent(info.event);
        setSelectedEventPlain({
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            description: info.event.extendedProps.description,
            groups: info.event.extendedProps.groups,
            uniform: info.event.extendedProps.uniform,
            isRecurring: info.event.extendedProps.isRecurring,
            coach: info.event.extendedProps.coach,
        });
        setEventWindowOpen(true);
    }
//it looks like it can be one function for deleting one event
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")&&selectedEvent) {
            await eventsService.deleteEvent(selectedEvent.id);

            selectedEvent.remove();
            // Refresh events
/*            const calendarApi = calendarRef.current.getApi();
            const view = calendarApi.view;
            await fetchEvents(view.activeStart.toISOString().split('T')[0], view.activeEnd.toISOString().split('T')[0]);*/
            setEventWindowOpen(false);
            setSelectedEvent(null);
            setSelectedEventPlain(null);
        }
    }
//for deleting all recurring events
    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all similar events?")&&selectedEvent) {
            await recurringEventsService.deleteEvent(selectedEvent.extendedProps.eventId);
            // Refresh events
            const calendarApi = calendarRef.current.getApi();
            const view = calendarApi.view;
            await fetchEvents(view.activeStart.toISOString().split('T')[0], view.activeEnd.toISOString().split('T')[0]);
            setEventWindowOpen(false);
            setSelectedEvent(null);
            setSelectedEventPlain(null);
        }
    }

    const fetchEvents = async (start, end) => {
        console.log('fetchEvents')
        try {
            let events = await eventsService.getAllEvents(start, end);
            console.log("events", events);
            console.log("I want to see users fields", user);
        const coloredEvents = events.map(event => ({

            id: event.id,
            title: event.event.title,
            start: event.start,
            end: event.end,
            extendedProps: {
                eventId: event.eventId,
                groups: event.event.groups.map((group) => group.name).join(", "),
                description: event.description,
                uniform: event.uniform,
                isRecurring: event.event.isRecurring,
                coachId: event.coachId,
                coach: event.coach.firstName + ' ' + event.coach.lastName
            },
            display: "block"
    }));
        console.log("events", coloredEvents);
        setEvents(coloredEvents);
    } catch (err) {
        console.log(err);
    }
}

    const showEvent = (arg)=>  {
        const event = arg.event.extendedProps;

        const startTime = arg.event.start.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false

        });
        const endTime = arg.event.end?.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        }) || '';

        const timeRange = endTime ? `${startTime} - ${endTime}` : startTime;
        return {
            html: `
                <b>${timeRange}</b> <br>
                ${arg.event.title} <br>
                <b>${event.uniform}</b> <br>
                ${event.groups}
            `
        };
    }
    const handleEventCreated = async () => {
        setFormIsVisible(false);
        // Re-fetch events for current view
        const calendarApi = calendarRef.current.getApi();
        const view = calendarApi.view;
        await fetchEvents(view.activeStart.toISOString().split('T')[0], view.activeEnd.toISOString().split('T')[0]);
    };

    const handleDatesSet = async (info) => {
        await fetchEvents(info.startStr, info.endStr);
    }

    return (
        <div>
            {user&&user.roles.includes('admin')?
                <Button
                variant="contained"
                color="primary"
                onClick={() => setFormIsVisible(true)}
                style={{ marginBottom: '1rem' }}
            >
                add new event
            </Button>:null}
            {user&&user.group?<Button variant="contained" color="primary" onClick={()=>setIsEventsFiltered(!isEventsFiltered)} style={{ marginBottom: '1rem' }}>
                {!isEventsFiltered?'show my group events':'show all club events'}
            </Button>: null}

            {selectedEvent&&<Event event={selectedEventPlain}
                                   open={eventWindowOpen}
                                   setOpen={setEventWindowOpen}
                                   handleDelete={handleDelete}
                                   handleDeleteAll={handleDeleteAll}
            />}
            {/*<Dialog
                open={eventWindowOpen}
                onClose={() => setEventWindowOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {selectedEvent.title}
                </DialogTitle>
                <DialogContent>
                    <p>{selectedEvent.extendedProps.description}</p>
                    <p><b>Groups:</b> {selectedEvent.extendedProps.groups}</p>
                    <p><b>Uniform:</b> {selectedEvent.extendedProps.uniform}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>*/}

            {formIsVisible && <EventForm onEventCreated={handleEventCreated} onCancel={() => setFormIsVisible(false)}/>}
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                ref={calendarRef}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={!isEventsFiltered?events:events.filter(event => event.extendedProps.groups.includes(user.group.name))}
                eventClick={openEventFunctions}
                datesSet={handleDatesSet}
                eventContent={showEvent}
                height="auto"
                slotMinTime="9:00:00"
                slotMaxTime="20:00:00"
            />
        </div>
    )
}

export default Events;