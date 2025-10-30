import React, { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasOpenedNotificationPage, setHasOpenedNotificationPage] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            const dp = require("../../assets/dp.jpg");
            const dp2 = require("../../assets/dp2.webp");

            const data = [
                { id: 1, name: "Demola Aoki", time: "4hrs", image: dp, iconType: "album" },
                { id: 2, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
                { id: 3, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
                { id: 4, name: "Quency Demola", time: "4hrs", image: dp2, iconType: "folder" },
            ];

            setNotifications(data);

            // ✅ If user hasn’t opened Notification page yet, show count
            if (!hasOpenedNotificationPage) {
                setUnreadCount(data.length);
            }
        };

        fetchNotifications();

        // simulate new data every 10s (like real-time updates)
        const interval = setInterval(fetchNotifications, 10000);

        return () => clearInterval(interval);
    }, [hasOpenedNotificationPage]);

    // when user opens Notification screen
    const markAllAsRead = () => {
        setUnreadCount(0);
        setHasOpenedNotificationPage(true); // remember user saw them
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications, unreadCount, markAllAsRead }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
