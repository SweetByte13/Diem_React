import React, { useState, useEffect } from 'react';
import { Block } from '@uiw/react-color';

const daysOfWeek = [
  { label: 'Mon', value: 'Mo' },
  { label: 'Tue', value: 'Tu' },
  { label: 'Wed', value: 'We' },
  { label: 'Thu', value: 'Th' },
  { label: 'Fri', value: 'Fr' },
  { label: 'Sat', value: 'Sa' },
  { label: 'Sun', value: 'Su' }
];
const habitTrackingTypes = [
  { id: '5288ff16dde74f5baa77c0c710897d28', name: 'Check' }
];
const frequencies = ['Daily', 'Weekly', 'Monthly'];

const ModalHabit = ({ closeModal, handleSubmit, currentHabit, handleDelete }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [recurrencePattern, setRecurrencePattern] = useState([]);
  const [frequency, setFrequency] = useState('Weekly');
  const [isInactive, setIsInactive] = useState(false);
  const [habitTrackingTypeId, setHabitTrackingTypeId] = useState('5288ff16dde74f5baa77c0c710897d28');

  useEffect(() => {
    if (currentHabit) {
      setTitle(currentHabit.name);
      setColor(currentHabit.color);
      const [freq, byday] = currentHabit.recurrence_pattern.split(';');
      setFrequency(freq.split('=')[1]);
      setRecurrencePattern(byday.split('=')[1].split(','));
      setIsInactive(currentHabit.is_inactive);
      setHabitTrackingTypeId(currentHabit.habit_tracking_type_id);
    }
  }, [currentHabit]);

  const handleFrequencyChange = (e) => {
    const value = e.target.value;
    setFrequency(value);
    if (value === 'Daily') {
      // If Daily is selected, mark all days as selected
      setRecurrencePattern(daysOfWeek.map(day => day.value));
    } else {
      setRecurrencePattern([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formattedRecurrencePattern = `FREQ=${frequency};`;
    if (frequency === 'Daily') {
      formattedRecurrencePattern += `BYDAY=${daysOfWeek.map(day => day.value).join(',')};`;
    } else {
      formattedRecurrencePattern += `BYDAY=${recurrencePattern.join(',')};`;
    }

    handleSubmit({
      name: title,
      color,
      habit_tracking_type_id: habitTrackingTypeId,
      recurrence_pattern: formattedRecurrencePattern,
      created_dt: currentHabit ? currentHabit.created_dt : new Date().toISOString(),
      is_inactive: isInactive,
      habit_values: [] // Assuming habit values need to be added
    });
    closeModal();
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleCheckboxChange = (dayValue) => {
    setRecurrencePattern((prevPattern) =>
      prevPattern.includes(dayValue)
        ? prevPattern.filter((d) => d !== dayValue)
        : [...prevPattern, dayValue]
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
              <label key={day.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={recurrencePattern.includes(day.value)}
                  onChange={() => handleCheckboxChange(day.value)}
                  className="mr-2"
                />
                {day.label}
              </label>
            ))}
          </div>
          <select
            value={frequency}
            onChange={handleFrequencyChange}
            className="border p-2 mb-4 w-full"
          >
            <option value="">Select Frequency</option>
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
          <select
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
          </select>
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
