import React, { useState, useEffect } from 'react';
import ModalHabit from './ModalHabit';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, parse } from 'date-fns';

const initialHabits = [
  { title: 'Workout', color: '#ff6347', recurrence_pattern: 'Mon,Wed,Fri' }, // Tomato color
  { title: 'Laundry', color: '#4682b4', recurrence_pattern: 'Sat' }, // SteelBlue color
  { title: 'Practice Guitar', color: '#F0A202', recurrence_pattern: 'Tue,Thu,Sat' }, // Vibrant Orange color
  { title: 'Study Hebrew', color: '#56B4E9', recurrence_pattern: 'Mon,Wed,Fri' }, // Sky Blue color
  { title: 'Read for 30 min', color: '#E91E63', recurrence_pattern: 'Sat,Sun' }, // Deep Pink color
  { title: 'Meal Prep', color: '#4CAF50', recurrence_pattern: 'Mon,Wed,Fri' }, // Fresh Green color
  { title: 'Coding', color: '#9C27B0', recurrence_pattern: 'Mon,Wed,Fri' },
  {title: 'Dishes', color: '#ff6347', recurrence_pattern: 'Mon,Wed,Fri' } // Royal Purple color
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState(initialHabits);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateData = () => {
    // This function could be used to handle any additional data preparation needed
  };

  useEffect(() => {
    updateData();
  }, [habits]);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center my-2">
        <div className="text-3xl font-bold">{format(currentMonth, dateFormat)}</div>
        <div>
          <button className="border rounded py-1 px-3 mx-1 bg-[#301934] text-white" onClick={prevMonth}>Prev</button>
          <button className="border rounded py-1 px-3 mx-1 bg-[#301934] text-white" onClick={nextMonth}>Next</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-500">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`border p-2 h-32 lg:h-48 flex flex-col overflow-y-auto custom-scrollbar ${isSameDay(day, selectedDate) ? "bg-[rgb(184,155,189)]" : ""}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
            {renderHabits(day)}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleHabitClick = (habit) => {
    setCurrentHabit(habit);
    setIsModalOpen(true);
  };

  const renderHabits = (day) => {
    return habits
      .filter(habit => habit.recurrence_pattern.split(',').includes(format(day, 'EEE')))
      .map((habit, index) => (
        <div
          key={index}
          style={{ backgroundColor: `${habit.color}80` }} // Opaque color
          className="mt-1 text-sm p-1 rounded cursor-pointer"
          onClick={() => handleHabitClick(habit)}
        >
          {habit.title}
        </div>
      ));
  };


  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleAddHabit = () => {
    setIsModalOpen(true);
    setCurrentHabit(null);
  };

  const handleSubmit = (newHabit) => {
    if (currentHabit) {
      setHabits(habits.map(habit => (habit.id === currentHabit.id ? { ...currentHabit, ...newHabit } : habit)));
    } else {
      newHabit.id = new Date().getTime();
      setHabits([...habits, { ...newHabit }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const handleDelete = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
    closeModal();
  };

  return (
    <div className="bg-[#301934] min-h-screen flex items-center justify-center p-4 pt-16 pb-20">
      <div className="bg-white border border-gray-300 p-4 w-full max-w-screen-lg">
        {renderHeader()}
        <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddHabit}>Add Habit</button>
        {isModalOpen && <ModalHabit closeModal={closeModal} handleSubmit={handleSubmit} currentHabit={currentHabit} handleDelete={handleDelete} />}
        <div className="grid grid-cols-7 gap-2">
        </div>
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
