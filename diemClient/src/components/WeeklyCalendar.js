import React, { useState } from 'react';
import ModalHabit from './ModalHabit';
import { format, addDays, isSameDay, parse } from 'date-fns';

const initialHabits = [
  'Workout', 'Laundry', 'Practice Guitar', 'Study Hebrew', 'Read for 30 min', 'Meal Prep', 'Coding'
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeeklyCalendar = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabits, setSelectedHabits] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);

  const toggleHabit = (day, habit) => {
    setSelectedHabits((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit]: !prev[day]?.[habit],
      },
    }));
  };

  const handleSubmit = (newHabit) => {
    if (newHabit) {
      setHabits((prevHabits) => [...prevHabits, newHabit.title]);
      closeModal();
    }
  };

  const handleAddEvent = () => {
    setCurrentHabit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bg-[#301934]'>
      <div className='container flex items-center justify-between mx-auto my-auto'>
        <div className="flex-grow text-center pl-64 underline decoration-2 decoration-white">
          <header className="text-3xl pt-16 text-gray-100">
            Weekly Calendar View
          </header>
        </div>
        <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddEvent}>Add Habit</button>
        {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} />}
        <div className="grid grid-cols-7 gap-2">
        </div>
      </div>
      <div className="container p-16 flex justify-center mx-auto my-auto">
        <div className="w-full overflow-x-auto bg-grey-300">
          <table className="table-auto w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="border border-black p-2"></th>
                {days.map((day) => (
                  <th key={day} className="border border-black p-2 text-black">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit}>
                  <td className="border border-black p-2 text-black font-medium">{habit}</td>
                  {days.map((day) => (
                    <td
                      key={day}
                      style={{ backgroundColor: selectedHabits[day]?.[habit] ? habit.color : '' }}
                      className={"border border-black p-2"}
                      onClick={() => toggleHabit(day, habit)}

                    >
                      {selectedHabits[day]?.[habit] ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check" className='text-white ml-auto mr-auto' viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                      </svg> : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
