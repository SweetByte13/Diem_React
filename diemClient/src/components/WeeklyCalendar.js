import React, { useState, useEffect, useContext } from 'react';
import ModalHabit from './ModalHabit';
import { format, addDays, startOfWeek, endOfWeek, subWeeks, addWeeks } from 'date-fns';
import { AppContext } from "../context/Context";

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeeklyCalendar = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  const { user, id } = useContext(AppContext);

  useEffect(() => {
    const fetchHabits = () => {
      if (user && id) {
        const today = new Date();
        const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
        const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayDayOfWeek = days[today.getDay()];
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();

        fetch(`http://localhost:5555/habits_by_user/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ startDate: startOfWeekDate.toISOString().split('T')[0], endDate: endOfWeekDate.toISOString().split('T')[0] })
        })
          .then(response => {
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
            setMonth(todayMonth); // Set the month here
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    };

    fetchHabits();
  }, [user, id, currentWeek]);

  useEffect(() => {
    updateData()
  }, [habits]);

  const updateData = () => {
    const initialSelectedHabits = {};

    habits.forEach(habit => {
      // Extract the recurrence pattern
      const recurrencePattern = habit.recurrence_pattern;
      const freqMatch = recurrencePattern.match(/FREQ=(\w+);/);
      const byDayMatch = recurrencePattern.match(/BYDAY=([\w,]+);/);

      const freq = freqMatch ? freqMatch[1] : null;
      const days = byDayMatch ? byDayMatch[1].split(',') : [];

      // Determine if the habit occurs today
      const today = new Date().toLocaleString('en-us', { weekday: 'short' });

      if (freq === 'Daily' || days.includes(today.slice(0, 2))) {
        days.forEach(day => {
          if (!initialSelectedHabits[day]) initialSelectedHabits[day] = {};
          initialSelectedHabits[day][habit.name] = {
            isChecked: habit.habit_occurances && Array.isArray(habit.habit_occurances) && habit.habit_occurances.some(occurrence => occurrence.is_complete),
            isInPattern: true,
            color: habit.color + '33', // Opaque color for days the habit occurs but is not complete
            fullColor: habit.color // Full color for days the habit is complete
          };
        });
      }
    });

    // Ensure cells outside the habit occurrence pattern are white
    days.forEach(day => {
      if (!initialSelectedHabits[day]) initialSelectedHabits[day] = {};
      habits.forEach(habit => {
        if (!initialSelectedHabits[day][habit.name]) {
          initialSelectedHabits[day][habit.name] = {
            isChecked: false,
            isInPattern: false,
            color: '#FFFFFF', // White color for non-occurrence days
          };
        }
      });
    });
    setSelectedHabits(initialSelectedHabits);
  };

  const handleCellClick = (day, habit) => {
    const selectedHabit = selectedHabits[day][habit.name];
    const isComplete = !selectedHabit.isChecked;

    if (!selectedHabit.isInPattern) {
      // Workflow for habit occurrences not in the recurrence pattern
      if (!selectedHabit.isChecked && !selectedHabit.wasCreated) {
        // First click: Create new habit occurrence and mark complete
        createNewHabitOccurrence(day, habit);
      } else if (selectedHabit.isChecked) {
        // Second click: Mark habit occurrence as incomplete (turn cell opaque)
        markHabitIncomplete(day, habit);
      } else if (!selectedHabit.isChecked && selectedHabit.wasCreated) {
        // Third click: Delete habit occurrence (cell turns white)
        deleteHabitOccurrence(day, habit);
      }
    } else {
      // For habit occurrences in the recurrence pattern, simply toggle completion
      toggleHabitCompletion(day, habit);
    }
  };

  const createNewHabitOccurrence = (day, habit) => {
    // Simulating creation of a new habit occurrence
    const newOccurrence = { id: Date.now(), is_complete: true, day: day, habit_id: habit.id };

    // Update state with new habit occurrence
    setSelectedHabits(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit.name]: {
          ...prev[day][habit.name],
          isChecked: true,
          wasCreated: true,
          color: habit.color
        },
      },
    }));

    // Update backend
    fetch('http://localhost:5555/create_habit_occurrence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOccurrence),
    })
      .then(response => {
        if (response.ok) {
          console.log('Habit occurrence created successfully');
        } else {
          throw new Error('Failed to create habit occurrence');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const markHabitIncomplete = (day, habit) => {
    setSelectedHabits(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit.name]: {
          ...prev[day][habit.name],
          isChecked: false,
          color: habit.color + '33', // Opaque color for incomplete
        },
      },
    }));

    // Update backend
    const endpoint = `http://localhost:5555/mark_habit_occurance_incomplete/${habit.habit_occurances[0].id}`;
    fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Habit occurrence marked as incomplete');
        } else {
          throw new Error('Failed to mark habit occurrence as incomplete');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const deleteHabitOccurrence = (day, habit) => {
    setSelectedHabits(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit.name]: {
          isChecked: false,
          wasCreated: false,
          isInPattern: false,
          color: '#FFFFFF', // Turn cell white
        },
      },
    }));

    // Update backend
    const endpoint = `http://localhost:5555/delete_habit_occurrence/${habit.habit_occurances[0].id}`;
    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Habit occurrence deleted successfully');
        } else {
          throw new Error('Failed to delete habit occurrence');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const toggleHabitCompletion = (day, habit) => {
    const isChecked = !selectedHabits[day][habit.name].isChecked;

    setSelectedHabits(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [habit.name]: {
          ...prev[day][habit.name],
          isChecked: isChecked,
        },
      },
    }));

    // Update backend
    const endpoint = `http://localhost:5555/mark_habit_occurance_${isChecked ? 'complete' : 'incomplete'}/${habit.habit_occurances[0].id}`;
    fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          console.log(`Habit occurrence ${isChecked ? 'completed' : 'incompleted'} successfully`);
        } else {
          throw new Error(`Failed to mark habit occurrence ${isChecked ? 'complete' : 'incomplete'}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">{dayOfWeek}, {month} / {date}</h3>
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

  const handleSubmit = (newHabit) => {
    if (newHabit) {
      if (currentHabit) {
        // Update existing habit
        fetch(`http://localhost:5555/habit/${currentHabit.id}`, {
          method: 'PATCH',
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
              throw new Error('Failed to update habit');
            }
          })
          .then(data => {
            setHabits(habits.map(habit => (habit.id === currentHabit.id ? data : habit)));
          })
          .catch(error => {
            console.error('Error:', error);
          });
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
    }
  };


  const handleAddEvent = () => {
    setCurrentHabit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = name => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.name !== name));
    closeModal();
  };

  const getDateForDay = (startDate, dayIndex) => {
    return addDays(startDate, dayIndex);
  };

  const startOfWeekDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

  return (
    <div>
      <div className='container flex items-center justify-between mx-auto my-auto'>
        <div className="flex-grow text-center decoration-white">
          <div className='flex items-center justify-between w-full'>
            <div className="flex-grow text-center">
              <header className="text-3xl pt-16 ml-28">
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
                  <th key={day} className="border border-black p-2 text-black">{day} {format(addDays(startOfWeekDate, index), 'MM/dd')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <tr key={habit.name}>
                  <td className="border border-black p-2 text-black font-medium w-48 cursor-pointer" onClick={() => handleEditHabit(habit)}>
                    {habit.name}
                  </td>
                  {days.map(day => (
                    <td
                      key={day}
                      className={`border border-black p-2 w-32 h-12 ${selectedHabits[day]?.[habit.name]?.isChecked ? 'bg-white' : ''}`}
                      style={{ backgroundColor: selectedHabits[day]?.[habit.name]?.isChecked ? habit.color : (selectedHabits[day]?.[habit.name]?.color || '#FFFFFF33') }}
                      onClick={() => handleCellClick(day, habit)}
                    >
                      {selectedHabits[day]?.[habit.name]?.isChecked ? (
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
}

export default WeeklyCalendar;
