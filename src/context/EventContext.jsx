import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    { img: require('../../assets/picnic1.jpg'), title: 'Summer Vacation', count: '10 Photos', photos: [] },
  ]);

  const addEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
