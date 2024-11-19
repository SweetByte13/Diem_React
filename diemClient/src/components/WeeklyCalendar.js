import React, { useState, useEffect, useContext } from 'react';
import ModalHabit from './ModalHabit';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { AppContext } from "../context/Context";

const initialHabits = [
  { title: 'Workout', color: '#ff6347', recurrence_pattern: 'Mon,Wed,Fri' }, // Tomato color
  { title: 'Laundry', color: '#4682b4', recurrence_pattern: 'Sat' }, // SteelBlue color
  { title: 'Practice Guitar', color: '#F0A202', recurrence_pattern: 'Tue,Thu,Sat' }, // Vibrant Orange color
  { title: 'Study Hebrew', color: '#56B4E9', recurrence_pattern: 'Mon,Wed,Fri' }, // Sky Blue color
  { title: 'Read for 30 min', color: '#E91E63', recurrence_pattern: 'Sat,Sun' }, // Deep Pink color
  { title: 'Meal Prep', color: '#4CAF50', recurrence_pattern: 'Mon,Wed,Fri' }, // Fresh Green color
  { title: 'Coding', color: '#9C27B0', recurrence_pattern: 'Mon,Wed,Fri' }, // Royal Purple color,
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeeklyCalendar = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabits, setSelectedHabits] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const useAppContext = () => useContext(AppContext);
  const { user, setUser, id, setId } = useAppContext();

  useEffect(() => {
    updateData()
  }, [habits]);

  const updateData = () => {
    const initialSelectedHabits = {};
    habits.forEach(habit => {
      const days = habit.recurrence_pattern.split(',');
      days.forEach(day => {
        if (!initialSelectedHabits[day]) initialSelectedHabits[day] = {};
        initialSelectedHabits[day][habit.title] = {
          isChecked: false,
          isInPattern: true,
          color: habit.color + '33', // Opaque color
        };
      });
    });
    // Ensure cells outside the habit occurrence pattern are white
    days.forEach(day => {
      if (!initialSelectedHabits[day]) initialSelectedHabits[day] = {};
      habits.forEach(habit => {
        if (!initialSelectedHabits[day][habit.title]) {
          initialSelectedHabits[day][habit.title] = {
            isChecked: false,
            isInPattern: false,
            color: '',
          };
        }
      });
    });
    setSelectedHabits(initialSelectedHabits);
  }

  const toggleHabit = (day, habit) => {
    setSelectedHabits(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit.title]: {
          ...prev[day][habit.title],
          isChecked: !prev[day][habit.title].isChecked,
        },
      },
    }));
  };

  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
    updateData()
  };

  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
    updateData()
  };

  const renderHeader = () => {
    const startOfWeekDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(currentWeek, { weekStartsOn: 1 });
    const dateFormat = 'MMMM dd';
    return (
      <div className="flex flex-col items-center my-2">
        <div className="flex justify-between items-center w-full mt-4">
          <button className="border rounded py-1 px-3 bg-[#301934] text-white" onClick={prevWeek}>Prev</button>
          <div className="text-lg text-white text-center mx-4">
            {`${format(startOfWeekDate, dateFormat)} - ${format(endOfWeekDate, dateFormat)}`}
          </div>
          <button className="border rounded py-1 px-3 bg-[#301934] text-white" onClick={nextWeek}>Next</button>
        </div>
      </div>

    );
  };

  const handleEditHabit = habit => {
    setCurrentHabit(habit);
    setIsModalOpen(true);
  };

  const handleSubmit = newHabit => {
    if (newHabit) {
      if (currentHabit) {
        // Edit existing habit
        setHabits(prevHabits =>
          prevHabits.map(habit =>
            habit.title === currentHabit.title ? newHabit : habit
          )
        );
      } else {
        // Add new habit
        setHabits(prevHabits => [
          ...prevHabits,
          {
            title: newHabit.title,
            color: newHabit.color,
            recurrence_pattern: newHabit.recurrence_pattern,
          },
        ]);
      }
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

  const handleDelete = title => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.title !== title));
    closeModal();
  };

  const getDateForDay = (startDate, dayIndex) => {
    return addDays(startDate, dayIndex);
  };

  const startOfWeekDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

  return (
    <div className='bg-[#301934]'>
      <div className='container flex items-center justify-between mx-auto my-auto'>
        <div className="flex-grow text-center decoration-white">
          <div className='flex items-center justify-between w-full'>
            <div className="flex-grow text-center">
              <header className="text-3xl pt-16 text-gray-100 ml-28">
                Weekly Calendar View
              </header>
            </div>
            <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddEvent}>Add Habit</button>
            {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} handleDelete={handleDelete} />}
          </div>
          {renderHeader()}
        </div>
        <div className="grid grid-cols-7 gap-2">
        </div>
      </div>
      <div className="container p-16 flex justify-center mx-auto my-auto">
        <div className="w-full overflow-x-auto bg-grey-300">
          <table className="table-auto w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="border border-black p-2"></th>
                {days.map((day, index) => (
                  <th key={day} className="border border-black p-2 text-black">{day} {format(getDateForDay(startOfWeekDate, index), 'MM/dd')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <tr key={habit.title}>
                  <td className="border border-black p-2 text-black font-medium w-48 cursor-pointer" onClick={() => handleEditHabit(habit)}>
                    {habit.title}
                  </td>
                  {days.map(day => (
                    <td
                      key={day}
                      className={`border border-black p-2 w-32 h-12 ${selectedHabits[day]?.[habit.title]?.isChecked ? 'bg-white' : ''}`}
                      style={{ backgroundColor: selectedHabits[day]?.[habit.title]?.isChecked ? habit.color : selectedHabits[day]?.[habit.title]?.color }}
                      onClick={() => toggleHabit(day, habit)}
                    >
                      {selectedHabits[day]?.[habit.title]?.isChecked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check text-white mx-auto" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                        </svg>
                      ) : ''}
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
