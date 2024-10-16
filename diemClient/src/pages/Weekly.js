import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import WeeklyCalendar from "../components/WeeklyCalendar";

function Weekly() {
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return (
        <>
           <WeeklyCalendar/>
        </>
    )
}
export default Weekly