import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";

function DailyHabits() {
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    const [habits, setHabits] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [completed, setCompleted] = useState(true);

    useEffect(() => {
        setHabits([
            { name: "Workout", habit_occurances: [] },
            { name: "Practice Guitar", habit_occurances: [] },
            { name: "Wash Dishes", habit_occurances: [] },
        ]);
        setDayOfWeek("Monday")
    }, []);

    function handleCheckBox(e) {
        console.log(e.target.value)
        setCompleted(false);

        // if (completed = true) {
        //     fetch("", {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": 'application/json'
        //         },
        //         body: JSON.stringify()
        //     })
        //         .then((resp) => {

        //             if (!resp.ok) {
        //                 throw new Error(resp.statusText);
        //             }
        //             else {
        //                 return resp.json()
        //             }
        //         }).then(resp => {

        //         });
        // }
    };

    return (
        <div className="columns-2 min-h-full">
            <div className="flex justify-left min-h-full pt-16 mr-auto ml-auto mt-14 pb-24 bg-gray-700 left-px">
                <div className="bg-white border-x-neutral-200 w-64 h-64 pl-16 ml-24 pr-12 pt-12 text-center">
                    This is where the buttons for changing to different views will be
                </div>
            </div>
            <div className="flex justify-center min-h-full pt-16 mr-auto ml-auto mt-14 mb-64">
                <div className="w-64 h-48">
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white ml-16"> {dayOfWeek} </h3>
                    <div className="w-64 h-48">
                        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {habits.map((habit, index) => (
                                <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input type="checkbox" value={habit.name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onClick={(e) => handleCheckBox(e)} />
                                        <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{habit.name}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DailyHabits;
