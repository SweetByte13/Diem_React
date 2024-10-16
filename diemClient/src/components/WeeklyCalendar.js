import React, { useState } from 'react';

const initialHabits = [
  'Workout',
  'Laundry',
  'Practice Guitar',
  'Study Hebrew',
  'Read for 30 min',
  'Meal Prep',
  'Coding'
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeeklyCalendar = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabits, setSelectedHabits] = useState({});

  const toggleHabit = (day, habit) => {
    setSelectedHabits((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit]: !prev[day]?.[habit],
      },
    }));
  };

  const addHabit = () => {
    const newHabit = prompt("Enter a new habit:");
    if (newHabit) {
      setHabits((prevHabits) => [...prevHabits, newHabit]);
    }
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="mr-4">
        <button 
          className="border rounded py-1 px-3 mb-4 bg-indigo-900 text-white"
          onClick={addHabit}
        >
          Add Habit
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit}>
                <td className="border border-gray-300 p-2">{habit}</td>
                {days.map((day) => (
                  <td 
                    key={day} 
                    className={`border border-gray-300 p-2 ${selectedHabits[day]?.[habit] ? 'bg-blue-200' : ''}`}
                    onClick={() => toggleHabit(day, habit)}
                  >
                    {selectedHabits[day]?.[habit] ? '✔️' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
