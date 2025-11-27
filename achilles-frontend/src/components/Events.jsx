import {Button} from "@mui/material";
import EventForm from "./EventForm.jsx";
import {useEffect, useRef, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventsService from "../services/events.js";
import {useDispatch, useSelector} from "react-redux";
import {initializeEvents} from "../reducers/eventsReducer.js";

const Events = () => {
    const [formIsVisible, setFormIsVisible] = useState(false);
    const calendarRef = useRef(null);
/*    const events = useSelector(state => state.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeEvents());
    }, [])*/

    const initEvents = async (info, successCallback, failureCallback) => {
        try {
            const startUTC = info.start.toISOString();
            const endUTC = info.end.toISOString();

            let events = await eventsService.getAllEvents(info.startStr, info.endStr);
            console.log("events before mapping", events);
        const coloredEvents = events.map(event => ({
            id: event.id,
            title: event.event.title,
            start: event.start,
            end: event.end,
            extendedProps: {
                groups: event.event.groups.map((group) => group.name).join(", "),
                description: event.description,
                uniform: event.uniform
            },
            display: "block"
    }));
        console.log("events", coloredEvents);
        successCallback(coloredEvents);

    } catch (err) {
        failureCallback(err);
    }
}
    const showEvent = (arg)=>  {
        const event = arg.event.extendedProps;
        // Format start and end times manually
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
    const handleEventCreated = () => {
        setFormIsVisible(false);
        if (calendarRef.current) {
            calendarRef.current.getApi().refetchEvents();
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setFormIsVisible(true)}
                style={{ marginBottom: '1rem' }}
            >
                add new event
            </Button>
            {formIsVisible && <EventForm onEventCreated={handleEventCreated} />}
            <h2>Events Page</h2>
            <p>This is where the events will be displayed.</p>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                ref={calendarRef}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={initEvents}
                eventContent={showEvent}
                height="auto"
                slotMinTime="10:00:00"
                slotMaxTime="20:00:00"
            />
        </div>
    )
}

export default Events;