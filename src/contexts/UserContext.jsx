
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/getCurrentUser";
import { HubConnectionBuilder } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(null);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const login = async (userInfo) => {
        setUser(userInfo.user);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        const hubConnection = new HubConnectionBuilder()
            .withUrl("http://192.168.1.127:6700/notification-hub", { withCredentials: true }) // Đổi thành URL của SignalR server
            .withAutomaticReconnect()
            .build();

        // newConnection.on("OnlineFriends", (friends) => {
        //     setOnlineFriends(friends); // Cập nhật danh sách bạn bè online
        // });
        // console.log('toi dang online')
        // try {

        //     await newConnection.start();
        //     console.log("SignalR connected");
        //     await newConnection.invoke("AddUser", userInfo.user.id); // Gửi userId lên server
        // } catch (err) {
        //     console.error("SignalR connection failed:", err);
        // }

        // setConnection(newConnection);
    };

    const logout = () => {
        setUser(null);
        // if (connection) {
        //     connection.stop();
        //     setConnection(null);
        // }

    };
    useEffect(() => {
        setLoading(true)
        async function fetchApi() {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser.user);
                    setLoading(false)
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                }
            }
        }
        fetchApi();
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}
// export default UserContext