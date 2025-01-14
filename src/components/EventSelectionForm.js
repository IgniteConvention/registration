import React, { useState } from 'react';

export default function EventSelectionForm({ student, availableEvents, onSubmit }) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupIdentifiers, setGroupIdentifiers] = useState({});
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

  // Handle group identifier input
  const handleGroupChange = (eventName, group) => {
    setGroupIdentifiers((prev) => ({
      ...prev,
      [eventName]: group,
    }));
  };

  // Calculate total pages and events to show on the current page
  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesToShow = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form submission
  const handleSubmit = () => {
    const submittedEvents = selectedEvents.map((e) => ({
      ...e,
      group: groupIdentifiers[e.eventName] || 'N/A',
    }));
    onSubmit(student.studentName, submittedEvents);
  };

  return (
    <div className="container">
      <h2>Select Events for {student.studentName}</h2>
      {categoriesToShow.map((category) => (
        <div key={category} className="event-category">
          <h3>{category}</h3>
          {availableEvents[category].map((event) => (
            <div key={event}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedEvents.some(
                    (e) => e.eventCategory === category && e.eventName === event
                  )}
                  onChange={() => handleEventChange(category, event)}
                />
                {event}
              </label>
              {/* Add group identifier input for specific events */}
              {[
                "Bible Bowl",
                "400 Meter Relay",
                "Instrumental Ensemble",
                "Small Ensemble",
                "Skit",
                "Radio Program",
                "Sign Language Team (5-10)",
                "Sign Language Team (11-20)",
              ].includes(event) && (
                <input
                  type="text"
                  placeholder="Group (e.g., A, B)"
                  value={groupIdentifiers[event] || ''}
                  onChange={(e) => handleGroupChange(event, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
}
