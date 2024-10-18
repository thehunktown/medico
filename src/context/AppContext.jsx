import { createContext } from "react";
import { doctors } from "../assets/assets/assets";
/*
React Context allows you to share data across components without passing it down through every 
component in between. It acts like a central storage (a "magic chest") where components can access 
or provide data directly. This helps avoid "prop drilling" and makes managing global state easier. */
export const AppContext = createContext();
const AppContextProvider = (props) => {
    const currencySymbol = '$ ';
    // value is a chindren
    const value = {
        doctors,
        currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

// Note: after creating context please add context support in frontend