import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    renderCalendar();
  }, [currentDate]);

  useEffect(() => {
    // Select current date by default 
    if (!isSelectedDate(currentDate)) {
      setSelectedDates([...selectedDates, currentDate]);
    }
  }, [selectedDates, currentDate]);

  const renderCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay.getDay()) || dayCounter > lastDay.getDate()) {
          week.push(null);
        } else {
          week.push(dayCounter);
          dayCounter++;
        }
      }
      calendar.push(week);
    }

    return calendar.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={getDayClassName(day)}
            onClick={() => selectDate(day)}
          >
            {day}
          </td>
        ))}
      </tr>
    ));
  };

  const getDayClassName = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isSelected = isSelectedDate(selectedDate);
    const isCurrentDate = day === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth();

    if (isSelected) {
      return 'selected';
    } else if (isCurrentDate) {
      return 'current-date';
    } else {
      return '';
    }
  };

  const selectDate = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (isSelectedDate(selectedDate)) {
      setSelectedDates(selectedDates.filter(date => !dateEquals(date, selectedDate)));
    } else {
      setSelectedDates([...selectedDates, selectedDate]);
    }
  };

  const isSelectedDate = (date) => {
    return selectedDates.some(selectedDate => dateEquals(selectedDate, date));
  };

  const dateEquals = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatSelectedDates = () => {
    return selectedDates.map(date => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`).join(', ');
  };

  return (
    <div className="app-container">
      <table id="calendar">
        <thead>
          <tr>
            <th colSpan="7">
              <button onClick={handlePrevMonth}>Prev</button>
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              <button onClick={handleNextMonth}>Next</button>
            </th>
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
      <div>
      User Selected Dates -
      </div>
      <div>
        [{formatSelectedDates()}]
      </div>
    </div>
  );
};

export default App;
