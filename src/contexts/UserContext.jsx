
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/getCurrentUser";
import { HubConnectionBuilder } from "@microsoft/signalr";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(null);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const initializeSocketConnection = async (userInfo) => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl("http://10.18.25.110:6700/notification-hub", { withCredentials: true }) // Đổi thành URL của SignalR server
            .withAutomaticReconnect()
            .build();

        hubConnection.on("OnlineFriends", (friends) => {
            setOnlineFriends(friends);
        });
        hubConnection.on("FriendOnline", (friend) => {
            setOnlineFriends((prevFriends) => {
                if (!prevFriends.includes(friend)) {
                    return [...prevFriends, friend];
                }
                return prevFriends;
            });
        });

        hubConnection.on("FriendOffline", (friend) => {
            setOnlineFriends((prevFriends) => {
                return prevFriends.filter((f) => f !== friend);
            });
        });

        try {
            await hubConnection.start();
            await hubConnection.invoke("AddNewUser", userInfo.profile.id); // Gửi userId lên server
            setConnection(hubConnection);
        } catch (err) {
            console.error("SignalR connection failed:", err);
        }
    };
    const login = async (userInfo) => {
        setUser(userInfo.user);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        await initializeSocketConnection(userInfo.user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userInfo");

        if (connection) {
            connection.stop();
            setConnection(null);
        }

    };
    useEffect(() => {
        setLoading(true)
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        async function fetchApi() {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser.user);
                    setLoading(false);

                    await initializeSocketConnection(currentUser.user);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    logout();

                }
            }
        }
        if (storedUserInfo) {
            setUser(storedUserInfo.user);
            initializeSocketConnection(storedUserInfo.user);
            setLoading(false);
        } else {
            fetchApi();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, onlineFriends, connection }}>
            {children}
        </UserContext.Provider>
    )
}
// export default UserContext