import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        axios.get(`${serverUrl}/profile`, 
            { withCredentials: true },
        ).then((response) => setUserInfo(response.data))
        .catch((err) => console.error('Error fetching profile:', err));
    }, []);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}