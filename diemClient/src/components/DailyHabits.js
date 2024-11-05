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
            { name: "Workout", color: 'rgb(184,155,189)', habit_occurances: [] },
            { name: "Practice Guitar", color: 'rgb(70,130,180)', habit_occurances: [] },
            { name: "Wash Dishes", color: 'rgb(255,99,71)', habit_occurances: [] },
        ]);
        setDayOfWeek("Monday");
    }, []);

    function handleCheckBox(e) {
        console.log(e.target.value);
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
    }

    return (
        <div className="bg-[#301934] min-h-20 pt-20 pb-20 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">{dayOfWeek}</h3>
                <ul className="w-full text-sm font-medium text-gray-900">
                    {habits.map((habit, index) => (
                        <li key={index} style={{ borderColor: habit.color }} className="w-full border rounded-t-lg rounded-b-lg">
                            <div className="flex items-center p-3">
                                <input 
                                    type="checkbox" 
                                    id={`myCheckbox-${index}`}
                                    value={habit.name} 
                                    className="w-4 h-4 rounded focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    style={{ accentColor: habit.color }}
                                    onClick={(e) => handleCheckBox(e)} 
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{habit.name}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DailyHabits;
