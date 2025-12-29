import { createSlice } from "@reduxjs/toolkit";
import eventsService from "../services/events.js";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setAllEvents: (state, action) => {
      return action.payload;
    },
    appendEvent: (state, action) => {
      state.push(action.payload);
    },
    deleteEvent: (state, action) => {
      const eventToDeleteId = action.payload;
      return state.filter((event) => event.id !== eventToDeleteId);
    },
    updateEvent: (state, action) => {
      const eventToUpdate = action.payload;
      return state.map((event) =>
        event.id !== eventToUpdate.id ? event : eventToUpdate,
      );
    },
  },
});

export const { setAllEvents, appendEvent, deleteEvent, updateEvent } =
  eventsSlice.actions;

export const initializeEvents = () => {
  return async (dispatch) => {
    const events = await eventsService.getAllEvents();
    dispatch(setAllEvents(events));
  };
};

export const deleteEventAction = (id) => {
  return async (dispatch) => {
    await eventsService.deleteEvent(id);
    dispatch(deleteEvent(id));
  };
};

export default eventsSlice.reducer;
