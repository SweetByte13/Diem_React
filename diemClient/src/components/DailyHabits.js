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
        <div className="flex justify-center items-center min-h-full pt-16">
            <div className="w-64">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white ml-16"> {dayOfWeek} </h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {habits.map((habit, index) => (
                        <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {habit.name}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DailyHabits;
