// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const useAuthContext=()=>{
//     return useContext(AuthContext);
// }




// export const AuthContextProvider = ({ children }) => {
//     const [authUser, setAuthUser] = useState(
//         JSON.parse(localStorage.getItem("chat-user")) || null
//     );

//     return (
//         <AuthContext.Provider value={{ authUser, setAuthUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
import React, { createContext, useState, useContext } from "react"; // Add useContext here

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for using the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext); // This is where useContext is used
};
