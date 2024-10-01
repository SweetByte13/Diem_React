import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";

function DailyHabits() {
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    const [habits, setHabits] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState("");

    useEffect(() => {
        setHabits([
            { name: "Workout", habit_occurances: [] },
            { name: "Practice Guitar", habit_occurances: [] },
            { name: "Wash Dishes", habit_occurances: [] },
        ]);
        setDayOfWeek("Monday")
    }, []);

    return (
        <div className="flex justify-center pt-20">
            <row >
                <div className="justify-center pl-20 pb-5">
                    {dayOfWeek}
                </div>
                <ol className="box-content h-12 w-48 p-4 border-2 border-gray-600 bg-grey-300 pb-32 text-justify">
                    {habits.map((habit, index) => (
                        <li key={index} className="h-full w-full text-center">
                            {habit.name}
                        </li>
                    ))}
                </ol>
            </row>
            <br ></br>
        </div>
    );
}

export default DailyHabits;
