
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/getCurrentUser";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const login = (userInfo) => {
        setUser(userInfo.user);
        localStorage.setItem('isLogin', true);
        // localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('isLogin');
        localStorage.removeItem('userInfo');
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