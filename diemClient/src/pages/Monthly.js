import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import Calender from "../components/Calender";

function Weekly(){
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return(
        <>
        <Calender />
        </>
    )
}
export default Weekly