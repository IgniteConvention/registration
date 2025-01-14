import React, { useState } from "react";

export default function EventSelectionForm({ student, availableEvents, onSubmit }) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupIdentifiers, setGroupIdentifiers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Categories per page

  // Rules and Limits
  const maxTotalEvents = 13;
  const maxPerformanceEvents = 6;
  const maxEliminationEvents = 2;
  const maxAthleticEvents = 3;

  // Check event type for rules
  const isPerformanceEvent = (eventName) => eventName.includes("(P)");
  const isEliminationEvent = (eventName) =>
    ["Chess", "Checkers", "Bible Bowl", "Pace Bowl"].includes(eventName);
  const isAthleticEvent = (eventName) => eventName.includes("Athletics");

  // Handle event selection
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
        setErrorMessage(`You cannot select more than ${maxTotalEvents} total events.`);
        return;
      }
      if (isPerformanceEvent(eventName) && performanceCount >= maxPerformanceEvents) {
        setErrorMessage(`You cannot select more than ${maxPerformanceEvents} performance events.`);
        return;
      }
      if (isEliminationEvent(eventName) && eliminationCount >= maxEliminationEvents) {
        setErrorMessage(`You cannot select more than ${maxEliminationEvents} elimination events.`);
        return;
      }
      if (isAthleticEvent(eventName) && athleticCount >= maxAthleticEvents) {
        setErrorMessage(`You cannot select more than ${maxAthleticEvents} athletic events.`);
        return;
      }

      setSelectedEvents((prev) => [...prev, { eventCategory, eventName }]);
      setErrorMessage("");
    } else {
      setSelectedEvents((prev) =>
        prev.filter((e) => !(e.eventCategory === eventCategory && e.eventName === eventName))
      );
    }
  };

  // Handle group identifier input
  const handleGroupChange = (eventName, group) => {
    setGroupIdentifiers((prev) => ({
      ...prev,
      [eventName]: group,
    }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesToShow = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form submission
  const handleSubmit = () => {
    const submittedEvents = selectedEvents.map((e) => ({
      ...e,
      group: groupIdentifiers[e.eventName] || "N/A",
    }));
    onSubmit(student.studentName, submittedEvents);
  };

  return (
    <div className="container">
      <h2>Event Selection for {student.studentName}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                {["Bible Bowl", "Small Ensemble", "Skit"].includes(event) && (
                  <input
                    type="text"
                    placeholder="Group (e.g., A, B)"
                    value={groupIdentifiers[event] || ""}
                    onChange={(e) => handleGroupChange(event, e.target.value)}
                  />
                )}
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
