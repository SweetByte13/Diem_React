import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, parse } from 'date-fns';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="flex justify-between items-center my-2">
                <div className="text-lg font-bold">{format(currentMonth, dateFormat)}</div>
                <div>
                    <button className="border rounded py-1 px-3 mx-1" onClick={prevMonth}>Prev</button>
                    <button className="border rounded py-1 px-3 mx-1" onClick={nextMonth}>Next</button>
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
                        className={`border p-2 h-32 lg:h-48 flex flex-col ${isSameDay(day, selectedDate) ? "bg-blue-200" : ""}`}
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

    const renderEvents = (day) => {
        return events
            .filter(event => isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), day))
            .map((event, index) => (
                <div key={index} className={`mt-1 text-sm p-1 rounded ${event.color}`}>
                    {event.title}
                </div>
            ));
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const handleAddEvent = () => {
        const title = prompt("Enter event title:");
        const color = prompt("Enter event color class (e.g., bg-red-500):");
        if (title && color) {
            setEvents([...events, { date: format(selectedDate, 'yyyy-MM-dd'), title, color }]);
        }
    };

    const prevMonth = () => {
        setCurrentMonth(addDays(currentMonth, -30));
    };

    const nextMonth = () => {
        setCurrentMonth(addDays(currentMonth, 30));
    };

    return (
        <div className="border border-gray-300 p-4">
            {renderHeader()}
            <div className="grid grid-cols-7 gap-2">
            </div>
            {renderDays()}
            <div>
                {renderCells()}
            </div>
            <button className="border rounded py-1 px-3 mt-4" onClick={handleAddEvent}>Add Event</button>
        </div>
    );
};

export default Calendar;
