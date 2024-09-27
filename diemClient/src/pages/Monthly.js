import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import Calender from "../components/Calender";
import JSCalender from "../components/JSCalender";

function Monthly(){
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return(
        <>
        {/* <Calender /> */}
        <JSCalender />
        </>
    )
}
export default Monthly