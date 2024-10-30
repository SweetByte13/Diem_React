import React, { useState } from 'react';

const ModalSupport = ({ closeModal }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
  
    const onSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log({ title, message });
      closeModal();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4">Support Form</h2>
            <button onClick={closeModal} className="border rounded px-1 py-1 bg-[#301934] text-white mt-4 mb-4">X</button>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 mb-4 w-full"
            ></textarea>
            <button type="submit" className="border rounded px-4 py-2 bg-[#301934] text-white">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  export default ModalSupport;