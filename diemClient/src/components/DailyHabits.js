import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import ModalHabit from "./ModalHabit";
// import { useParams } from "react-router-dom";

function DailyHabits() {
    const { user, id} = useContext(AppContext);
    // const { id } = useParams();
    const [habits, setHabits] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState("Monday");
    const [completed, setCompleted] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchHabits = () => {
            console.log(id)
            if (user && id) {
                const today = new Date();
                const startDate = today.toISOString().split('T')[0];
                const endDate = today.toISOString().split('T')[0];
                fetch(`http://localhost:5555/habits_by_user/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ startDate, endDate })
                })
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error('Failed to fetch habits');
                    }
                })
                .then(data => {
                    setHabits(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        };
        fetchHabits();
    }, [user, id]);

    function handleCheckBox(e) {
        console.log(e.target.value);
        setCompleted(true);
    }

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
                    user_id: id, // Ensure user.id is a valid UUID string
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

    const handleDelete = (id) => {
        setHabits(habits.filter(habit => habit.id !== id));
        closeModal();
    };

    return (
        <div className="bg-[#301934] min-h-20 pt-20 pb-20 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddHabit}>Add Habit</button>
                {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} handleDelete={handleDelete} />}
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
