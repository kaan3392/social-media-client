import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer"


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    darkMode: JSON.parse(localStorage.getItem("mode")) || null,
    hamburger: false,
    not:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user || null));
        localStorage.setItem("mode", JSON.stringify(state.darkMode|| null));
    }, [state.user, state.darkMode]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            darkMode: state.darkMode,
            hamburger:state.hamburger,
            not:state.not,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
};