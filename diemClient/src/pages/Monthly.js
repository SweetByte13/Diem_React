import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import Calendar from "../components/Calendar";

function Monthly(){
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return(
        <>
        <Calendar />
        </>
    )
}
export default Monthly