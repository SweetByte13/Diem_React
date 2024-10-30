import React, { useState } from 'react';
import ModalEvent from './ModalEvent';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, parse } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            className={`border p-2 h-32 lg:h-48 flex flex-col ${isSameDay(day, selectedDate) ? "bg-[rgb(184,155,189)]" : ""}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
            {renderEvents(day)}
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


  //This way, the event.color value is injected into the class string, 
  //allowing you to apply different color classes based on the event's color property. 
  //For example, if event.color is bg-red-500, the div will have the class bg-red-500.
  // WE NEED TO RECONFIGURE THE DTAABASE TO HOLD THE EVENT COLOR AS text-COLOR#, 
  //so that the className can read it as the text being that color.
  //OTHERWISE, WE CAN DO IT FOR bg-EVENT#.

  // function Demo() {
  //   const [hex, setHex] = useState("#fff");
  //   return (
  //     <Sketch
  //       style={{ marginLeft: 20 }}
  //       color={hex}
  //       onChange={(color) => {
  //         setHex(color.hex);
  //       }}
  //     />
  //   );
  // }
  
  const renderEvents = (day) => {
    return events
      .filter(event => isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), day))
      .map((event, index) => (
        <div key={index} style={{backgroundColor: `${event.color}`}} className={"mt-1 text-sm p-1 rounded"} onClick={handleEventClick}>
          {event.title}
        </div>
      ));
  };

  const handleEventClick = (event) => {
    setIsModalOpen(true);
  }

  const handleDateClick = (day, event) => {
    setSelectedDate(day);
    setCurrentEvent(event);
  };

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (event) => {
    setEvents([...events, { date: format(selectedDate, 'yyyy-MM-dd'), ...event }]);
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

  return (
    <div className="bg-[#301934] min-h-screen flex items-center justify-center p-4 pt-16 pb-20">
      <div className="bg-white border border-gray-300 p-4 w-full max-w-screen-lg">
        {renderHeader()}
        <button className="border rounded py-1 px-3 mt-4 mb-12 bg-[#301934] text-white" onClick={handleAddEvent}>Add Event</button>
        {isModalOpen && <ModalEvent closeModal={closeModal} handleSubmit={handleSubmit} />}
        <div className="grid grid-cols-7 gap-2">
        </div>
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
