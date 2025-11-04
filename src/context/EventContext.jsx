

import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <EventContext.Provider value={{ events, setEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};