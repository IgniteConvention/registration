import React, { useState } from "react";

export default function EventSelectionForm({
  student,
  availableEvents,
  existingSelections,
  onSubmit,
}) {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Categories per page

  // Rules and Limits
  const maxTotalEvents = 13;
  const maxPerformanceEvents = 6;
  const maxEliminationEvents = 2;
  const maxAthleticEvents = 3;

  // Helper Functions for Rules
  const isPerformanceEvent = (eventName) => eventName.includes("(P)");
  const isEliminationEvent = (eventName) =>
    ["Chess", "Checkers", "Bible Bowl", "Pace Bowl"].includes(eventName);
  const isAthleticEvent = (eventName) => eventName.includes("Athletics");

  // Handle Event Selection
  const handleEventChange = (eventCategory, eventName) => {
    const alreadySelected = selectedEvents.some(
      (e) => e.eventCategory === eventCategory && e.eventName === eventName
    );

    const performanceCount = selectedEvents.filter((e) =>
      isPerformanceEvent(e.eventName)
    ).length;
    const eliminationCount = selectedEvents.filter((e) =>
      isEliminationEvent(e.eventName)
    ).length;
    const athleticCount = selectedEvents.filter((e) =>
      isAthleticEvent(e.eventName)
    ).length;

    if (!alreadySelected) {
      if (selectedEvents.length >= maxTotalEvents) {
        alert(`You cannot select more than ${maxTotalEvents} total events.`);
        return;
      }
      if (isPerformanceEvent(eventName) && performanceCount >= maxPerformanceEvents) {
        alert(`You cannot select more than ${maxPerformanceEvents} performance events.`);
        return;
      }
      if (isEliminationEvent(eventName) && eliminationCount >= maxEliminationEvents) {
        alert(`You cannot select more than ${maxEliminationEvents} elimination events.`);
        return;
      }
      if (isAthleticEvent(eventName) && athleticCount >= maxAthleticEvents) {
        alert(`You cannot select more than ${maxAthleticEvents} athletic events.`);
        return;
      }

      setSelectedEvents((prev) => [...prev, { eventCategory, eventName }]);
    } else {
      setSelectedEvents((prev) =>
        prev.filter(
          (e) => !(e.eventCategory === eventCategory && e.eventName === eventName)
        )
      );
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesToShow = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = () => {
    onSubmit(student.studentName, selectedEvents);
  };

  return (
    <div className="container event-selection">
      <h2>Event Selection for {student.studentName}</h2>
      {categoriesToShow.map((category) => (
        <div key={category} className="event-category">
          <h3>{category}</h3>
          <ul>
            {availableEvents[category].map((event) => (
              <li key={event}>
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
              </li>
            ))}
          </ul>
        </div>
      ))}
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
