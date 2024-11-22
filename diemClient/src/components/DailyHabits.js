import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import ModalHabit from "./ModalHabit";

function DailyHabits() {
    const { user, id } = useContext(AppContext);
    const [habits, setHabits] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [date, setDate] = useState(""); // New state for date number
    const [month, setMonth] = useState(""); // New state for month number
    const [completed, setCompleted] = useState(false);
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

    const handleCheckBox = (habit) => {
        // Ensure habit.habit_occurances[0] is defined before accessing its properties
        if (!habit.habit_occurances || habit.habit_occurances.length === 0) {
            console.error('No habit occurrences found.');
            return;
        }

        const isComplete = !habit.habit_occurances[0].is_complete;
        habit.habit_occurances[0].is_complete = isComplete;

        setCompleted(isComplete);

        if (isComplete) {
            markHabitComplete(habit.habit_occurances[0]);
        } else {
            markHabitIncomplete(habit.habit_occurances[0]);
        }
    };

    const markHabitComplete = (habitOccurance) => {
        setHabits([...habits]);
        fetch(`http://localhost:5555/mark_habit_occurance_complete/${habitOccurance.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error('Failed to mark habit occurrence complete');
                }
            })
            .then(data => {
                console.log(data);
                // Handle the response or update the state as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const markHabitIncomplete = (habitOccurance) => {
        setHabits([...habits]);
        fetch(`http://localhost:5555/mark_habit_occurance_incomplete/${habitOccurance.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error('Failed to mark habit occurrence incomplete');
                }
            })
            .then(data => {
                console.log(data);
                // Handle the response or update the state as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

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
        <div className="bg-[#301934] min-h-20 pt-20 pb-20 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddHabit}>Add Habit</button>
                {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} handleDelete={handleDelete} />}
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">{dayOfWeek}, {month} / {date}</h3>
                <ul className="w-full text-sm font-medium text-gray-900">
                    {habits.map((habit, index) => (
                        <li key={index} style={{ borderColor: habit.color }} className="w-full border rounded-t-lg rounded-b-lg">
                            <div className="flex items-center p-3">
                                <input
                                    type="checkbox"
                                    id={`myCheckbox-${index}`}
                                    value={habit.name}
                                    checked={habit.habit_occurances && habit.habit_occurances.length > 0 ? habit.habit_occurances[0].is_complete : false}
                                    className="w-4 h-4 rounded focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    style={{ accentColor: habit.color }}
                                    onClick={() => handleCheckBox(habit)}
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
