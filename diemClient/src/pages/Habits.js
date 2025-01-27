import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/Context";
import ModalHabit from "../components/ModalHabit";

function Habits(){
    const { user, id } = useContext(AppContext);
    const [habits, setHabits] = useState([]);
       const [dayOfWeek, setDayOfWeek] = useState("");
        const [date, setDate] = useState(""); // New state for date number
        const [month, setMonth] = useState(""); // New state for month number
        const [currentHabit, setCurrentHabit] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);

        useEffect(() => {
            const fetchHabits = () => {
                console.log(id);
                if (user && id) {
                    const today = new Date();
                    const startDate = today.toISOString().split('T')[0];
                    const endDate = today.toISOString().split('T')[0];
    
                    // Set the day of the week and date number based on today's date
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const todayDayOfWeek = days[today.getDay()];
                    const todayDate = today.getDate();
                    const todayMonth = today.getMonth()
    
                    fetch(`http://localhost:5555/habits_by_user/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ startDate, endDate })
                    })
                        .then(response => {
                            console.log(response);
                            if (response.ok) {
                                return response.json();
                            } else {
                                console.error('Failed to fetch habits');
                            }
                        })
                        .then(data => {
                            setHabits(data);
                            setDayOfWeek(todayDayOfWeek); // Set the day of the week here
                            setDate(todayDate); // Set the date number here
                            setMonth(todayMonth); //Set the month here
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
            };
            fetchHabits();
        }, [user, id]);

        const handleAddHabit = () => {
            setIsModalOpen(true);
            setCurrentHabit(null);
        };
    
        const handleSubmit = (newHabit) => {
            console.log(newHabit);
            if (currentHabit) {
                // Update existing habit in state
                setHabits(habits.map(habit => (habit.id === currentHabit.id ? { ...currentHabit, ...newHabit } : habit)));
            } else {
                // Create new habit
                fetch('http://localhost:5555/habit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newHabit.name,
                        color: newHabit.color,
                        habit_tracking_type_id: newHabit.habit_tracking_type_id,
                        recurrence_pattern: newHabit.recurrence_pattern,
                        user_id: id,
                        habit_values: newHabit.habit_values
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to create new habit');
                        }
                    })
                    .then(data => {
                        setHabits([...habits, data]);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            closeModal();
        };
    
        const closeModal = () => {
            setIsModalOpen(false);
        };
    
        const handleDelete = (habitId) => {
            setHabits(habits.filter(habit => habit.id !== habitId));
            closeModal();
        };    

        return (
            <div className="bg-[#301934] flex justify-center mt-10 min-h-screen">
                <div className="m-4 w-full max-w-lg bg-[#301934]">
                    <div className="w-full bg-white shadow-md rounded-lg p-4">
                    <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddHabit}>Add Habit</button>
                    {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} handleDelete={handleDelete} />}
                        <h1 className="text-2xl font-bold text-center mb-4">Habits</h1>
                        <ul>
                            {habits.map((habit, index) => (
                                <li key={index} style={{ borderColor: habit.color }} className="w-full border rounded-t-lg rounded-b-lg my-2">
                                    <div className="flex items-center p-3">
                                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center w-full">
                                            {habit.name}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

export default Habits;