import React, { useState } from 'react';

const EventRegistrationForm = ({ student, onSubmit, availableEvents }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupSelection, setGroupSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleEventChange = (eventCategory, eventName) => {
    const updatedEvents = [...selectedEvents];
    const eventIndex = updatedEvents.findIndex(
      (e) => e.eventCategory === eventCategory && e.eventName === eventName
    );
    if (eventIndex === -1) {
      updatedEvents.push({ eventCategory, eventName });
    } else {
      updatedEvents.splice(eventIndex, 1);
    }
    setSelectedEvents(updatedEvents);
  };

  const handleGroupChange = (eventName, group) => {
    setGroupSelection((prev) => ({
      ...prev,
      [eventName]: group,
    }));
  };

  const handleSubmit = () => {
    if (selectedEvents.length > 0) {
      onSubmit(
        student.studentName,
        selectedEvents.map((e) => ({
          ...e,
          group: groupSelection[e.eventName] || 'N/A',
        }))
      );
    } else {
      alert('Please select at least one event.');
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesPerPage = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      <div>
        {categoriesPerPage.map((eventCategory, index) => (
          <div key={index}>
            <h3>{eventCategory}</h3>
            <ul>
              {availableEvents[eventCategory].map((eventName) => (
                <li key={eventName}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedEvents.some(
                        (e) => e.eventCategory === eventCategory && e.eventName === eventName
                      )}
                      onChange={() => handleEventChange(eventCategory, eventName)}
                    />
                    {eventName}
                  </label>
                  {["Small Ensemble", "Skit"].includes(eventName) && (
                    <input
                      type="text"
                      placeholder="Group"
                      value={groupSelection[eventName] || ''}
                      onChange={(e) => handleGroupChange(eventName, e.target.value)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventRegistrationForm;
