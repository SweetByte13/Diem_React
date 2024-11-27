import React, { useState, useEffect, useContext } from 'react';
import ModalHabit from './ModalHabit';
import { AppContext } from '../context/Context';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay } from 'date-fns';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const { user, id } = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`http://localhost:5555/habits_by_user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchHabits();
  }, [id]);

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

  const handleSubmit = async (newHabit) => {
    if (currentHabit) {
      // Update existing habit
      try {
        const response = await fetch(`http://localhost:5555/habit/${currentHabit.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newHabit),
        });

        if (!response.ok) {
          throw new Error('Failed to update habit');
        }

        const updatedHabit = await response.json();
        setHabits(habits.map(habit => (habit.id === currentHabit.id ? updatedHabit : habit)));
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Create new habit
      try {
        const response = await fetch('http://localhost:5555/habit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newHabit),
        });

        if (!response.ok) {
          throw new Error('Failed to create new habit');
        }

        const createdHabit = await response.json();
        setHabits([...habits, createdHabit]);
      } catch (error) {
        console.error('Error:', error);
      }
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/habit/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }

      setHabits(habits.filter(habit => habit.id !== id));
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
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
