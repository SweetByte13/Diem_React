import React, { useState, useEffect } from 'react';
import { Circle, Block } from '@uiw/react-color';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const habitTrackingTypes = [
  { id: '1', name: 'Type 1' },
  { id: '2', name: 'Type 2' },
  // Add more habit tracking types as needed
];

const ModalHabit = ({ closeModal, handleSubmit, currentHabit, handleDelete }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [recurrencePattern, setRecurrencePattern] = useState([]);
  const [isInactive, setIsInactive] = useState(false);
  const [habitTrackingTypeId, setHabitTrackingTypeId] = useState('');

  useEffect(() => {
    if (currentHabit) {
      setTitle(currentHabit.title);
      setColor(currentHabit.color);
      setRecurrencePattern(currentHabit.recurrence_pattern.split(','));
      setIsInactive(currentHabit.is_inactive);
      setHabitTrackingTypeId(currentHabit.habit_tracking_type_id);
    }
  }, [currentHabit]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      title,
      color,
      habit_tracking_type_id: habitTrackingTypeId,
      recurrence_pattern: recurrencePattern.join(','),
      created_dt: currentHabit ? currentHabit.created_dt : new Date().toISOString(),
      is_inactive: isInactive
    });
    closeModal();
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleCheckboxChange = (day) => {
    setRecurrencePattern((prevPattern) =>
      prevPattern.includes(day)
        ? prevPattern.filter((d) => d !== day)
        : [...prevPattern, day]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-8 rounded shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl mb-4">{currentHabit ? 'Edit Habit' : 'Add New Habit'}</h2>
          <button onClick={closeModal} className="border rounded px-1 py-1 bg-[#301934] text-white mt-4 mb-4">X</button>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Habit Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <Block className="mr-auto ml-auto" color={color} onChange={handleColorChange} />
          <div className="flex justify-between mb-4 pt-6">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  checked={recurrencePattern.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
          {/* <select
            value={habitTrackingTypeId}
            onChange={(e) => setHabitTrackingTypeId(e.target.value)}
            className="border p-2 mb-4 w-full"
          >
            <option value="">Select Habit Tracking Type</option>
            {habitTrackingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select> */}
          <label className="flex items-center justify-center mx-auto">
            <input
              type="checkbox"
              checked={isInactive}
              onChange={(e) => setIsInactive(e.target.checked)}
              className="mr-2"
            />
            Inactive
          </label>
          <button type="submit" className="border rounded w-full mt-5 px-4 py-2 bg-[#301934] text-white">Submit</button>
        </form>
        {currentHabit && (
          <button onClick={() => handleDelete(currentHabit.id)} className="border rounded w-full mt-5 px-4 py-2 bg-red-500 text-white mt-4">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalHabit;
