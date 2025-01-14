import React, { useState } from 'react';

export default function EventSelectionForm({ student, availableEvents, onSubmit }) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Categories per page

  // Handle event selection
  const handleEventChange = (eventCategory, eventName) => {
    setSelectedEvents((prev) =>
      prev.some((e) => e.eventCategory === eventCategory && e.eventName === eventName)
        ? prev.filter((e) => !(e.eventCategory === eventCategory && e.eventName === eventName))
        : [...prev, { eventCategory, eventName }]
    );
  };

  // Handle pagination
  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesToShow = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = () => {
    onSubmit(student.studentName, selectedEvents);
  };

  return (
    <div>
      <h2>Select Events for {student.studentName}</h2>
      {categoriesToShow.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          {availableEvents[category].map((event) => (
            <label key={event}>
              <input
                type="checkbox"
                checked={selectedEvents.some(
                  (e) => e.eventCategory === category && e.eventName === event
                )}
                onChange={() => handleEventChange(category, event)}
              />
              {event}
            </label>
          ))}
        </div>
      ))}
      <div>
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>Previous</button>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>Next</button>
      </div>
      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
}
