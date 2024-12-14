import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function useSignalR(userId) {
    const [connection, setConnection] = useState(null);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        // Tạo kết nối SignalR
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://ip:6700/notification-hub") // URL của NotificationHub trên server
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            // Ngắt kết nối khi component bị hủy
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("SignalR connected!");

                    // Gửi userId đến server
                    connection.invoke("AddUser", userId);

                    // Lắng nghe sự kiện OnlineFriends từ server
                    connection.on("OnlineFriends", (friends) => {
                        setOnlineFriends(friends);
                    });
                })
                .catch((err) => console.error("SignalR connection failed:", err));
        }
    }, [connection, userId]);

    return { connection, onlineFriends };
}

export default useSignalR;
