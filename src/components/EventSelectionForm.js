import React, { useState } from "react";

export default function EventSelectionForm({
  student,
  availableEvents,
  existingSelections,
  onSubmit
}) {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const categories = Object.keys(availableEvents);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleEventChange = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleSubmit = () => {
    onSubmit(student.studentName, selectedEvents);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <h2>Event Selection for {student.studentName}</h2>
      {paginatedCategories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {availableEvents[category].map((event) => (
              <li key={event}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event)}
                    onChange={() => handleEventChange(event)}
                  />
                  {event}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
}
