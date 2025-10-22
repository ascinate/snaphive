import React, { createContext, useContext, useState } from 'react'

const NotificationContext = createContext();

export const NotoficationContext = ({ children }) => {
  const [count, setcount] = useState(0);
  return (
    <NotoficationContext.Provider value={{ count, setcount }}>
      {children}
    </NotoficationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext);