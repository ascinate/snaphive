import React, { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    //  Automatically fetch notifications periodically (simulate realtime)
    useEffect(() => {
        const fetchNotifications = async () => {
            const dp = require("../../assets/dp.jpg");
            const dp2 = require("../../assets/dp2.webp");

            // You can later replace this with an API call or socket update
            const data = [
                { id: 1, name: "Demola Aoki", time: "4hrs", image: dp, iconType: "album" },
                { id: 2, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
                { id: 3, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
                { id: 4, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
            ];
            setNotifications(data);
        };

        // Initial fetch
        fetchNotifications();

        // Refresh every 10 seconds to simulate realtime update
        const interval = setInterval(fetchNotifications, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
