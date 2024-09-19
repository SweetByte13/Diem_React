import React, { useContext } from "react";
import { AppContext } from "../context/Context";

function Weekly(){
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return(
        <>
        </>
    )
}
export default Weekly