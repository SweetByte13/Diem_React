import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import DailyHabits from "../components/DailyHabits";

function Daily(){
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return (
        <div>
            <DailyHabits />
        </div>
    )
}
export default Daily;