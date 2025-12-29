import { Button } from "@mui/material";
import EventForm from "./EventForm.jsx";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import eventsService from "../services/events.js";
import Event from "./Event.jsx";

const Events = () => {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsForView, setEventsForView] = useState([]);
  const [isEventsFiltered, setIsEventsFiltered] = useState(false);
  const [eventWindowOpen, setEventWindowOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventPlain, setSelectedEventPlain] = useState(null);
  const [initialValueForEventForm, setInitialValueForEventForm] =
    useState(null);
  const [isEvent, setIsEvent] = useState(false);

  const calendarRef = useRef(null);
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const openEventFunctions = async (info) => {
    info.jsEvent.preventDefault();
    const eventPlainObj = events.find(
      (event) => event.id === Number(info.event.id),
    );
    setSelectedEvent(info.event);
    setSelectedEventPlain(eventPlainObj);
    setEventWindowOpen(true);
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this event?") &&
      selectedEvent
    ) {
      await eventsService.deleteEvent(selectedEvent.id);

      selectedEvent.remove();
      // Refresh eventsForView
      const calendarApi = calendarRef.current.getApi();
      const view = calendarApi.view;
      await fetchEvents(
        view.activeStart.toISOString().split("T")[0],
        view.activeEnd.toISOString().split("T")[0],
      );
      setEventWindowOpen(false);
      setSelectedEvent(null);
      setSelectedEventPlain(null);
    }
  };

  const handleEventCreate = () => {
    setFormIsVisible(true);
    setIsEvent(true);
    setInitialValueForEventForm(null);
  };

  const handleScheduleCreate = () => {
    setFormIsVisible(true);
    setIsEvent(false);
    //        setInitialValueForEventForm({isSchedule:true});
  };

  const handleUpdateEvent = async () => {
    setInitialValueForEventForm(selectedEventPlain);
    setFormIsVisible(true);
    setEventWindowOpen(false);
    setIsEvent(true);
  };

  const handleCancelForm = async () => {
    setIsEvent(false);
    setFormIsVisible(false);
    setInitialValueForEventForm(null);
  };

  const fetchEvents = async (start, end) => {
    try {
      let events = await eventsService.getAllEvents(start, end);
      setEvents(events);
      const coloredEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        extendedProps: {
          scheduleId: event.scheduleId,
          groups: event.groups.map((group) => group.name).join(", "),
          description: event.description,
          uniform: event.uniform,
          coachId: event.coachId,
          coach: event.coach.firstName + " " + event.coach.lastName,
        },
        display: "block",
      }));
      setEventsForView(coloredEvents);
    } catch (err) {
      console.log(err);
    }
  };

  const showEvent = (arg) => {
    const event = arg.event.extendedProps;

    const startTime = arg.event.start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
    const endTime =
      arg.event.end?.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }) || "";

    const timeRange = endTime ? `${startTime} - ${endTime}` : startTime;
    return {
      html: `
                <b>${timeRange}</b> <br>
                ${arg.event.title} <br>
                <b>${event.uniform}</b> <br>
                ${event.groups}
            `,
    };
  };

  const handleEventCreated = async () => {
    setFormIsVisible(false);
    setInitialValueForEventForm(null);
    setIsEvent(false);
    // Re-fetch eventsForView for current view
    const calendarApi = calendarRef.current.getApi();
    const view = calendarApi.view;
    await fetchEvents(
      view.activeStart.toISOString().split("T")[0],
      view.activeEnd.toISOString().split("T")[0],
    );
  };

  const handleDatesSet = async (info) => {
    await fetchEvents(info.startStr, info.endStr);
  };

  return (
    <div>
      {user && user.roles.includes("admin") ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEventCreate}
            style={{ marginBottom: "1rem" }}
          >
            add new event
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleCreate}
            style={{ marginBottom: "1rem" }}
          >
            add new schedule
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/schedules"
            style={{ marginBottom: "1rem" }}
          >
            update schedule
          </Button>
        </div>
      ) : null}
      {user && user.group ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEventsFiltered(!isEventsFiltered)}
          style={{ marginBottom: "1rem" }}
        >
          {!isEventsFiltered ? "show my group events" : "show all events"}
        </Button>
      ) : null}

      {selectedEvent && (
        <Event
          event={selectedEventPlain}
          open={eventWindowOpen}
          setOpen={setEventWindowOpen}
          handleDelete={handleDelete}
          handleUpdateOneEvent={handleUpdateEvent}
        />
      )}

      {formIsVisible && (
        <EventForm
          initValues={initialValueForEventForm}
          isEvent={isEvent}
          onEventCreated={handleEventCreated}
          onCancel={handleCancelForm}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridDay",
        }}
        events={
          !isEventsFiltered
            ? eventsForView
            : eventsForView.filter((event) =>
                event.extendedProps.groups.includes(user.group.name),
              )
        }
        eventClick={openEventFunctions}
        datesSet={handleDatesSet}
        eventContent={showEvent}
        height="auto"
        slotMinTime="9:00:00"
        slotMaxTime="20:00:00"
      />
    </div>
  );
};

export default Events;
