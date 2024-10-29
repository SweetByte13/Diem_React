import React, { useState } from 'react';

const ModalHabit = ({ closeModal, handleSubmit, currentHabit, handleDelete }) => {
  const [title, setTitle] = useState(currentHabit ? currentHabit.title : '');
  const [color, setColor] = useState(currentHabit ? currentHabit.color : '');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ title, color });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl mb-4">Add New Habit</h2>
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
          <input
            type="text"
            placeholder="Habit Color (e.g., bg-red-500)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="border rounded px-4 py-2 bg-[#301934] text-white">Submit</button>
        </form>
        {currentHabit && (
          <button onClick={() => handleDelete(currentHabit.id)} className="border rounded px-4 py-2 bg-red-500 text-white mt-4">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalHabit;