// EventSelectionForm.js
import React, { useState } from "react";

const EventSelectionForm = ({ student, onSubmit, availableEvents, existingSelections, onBack }) => {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections);
  const [error, setError] = useState("");
  const [currentCategory, setCurrentCategory] = useState(Object.keys(availableEvents)[0]);

  // Constants for limits
  const MAX_EVENTS = 13;
  const MAX_PERFORMANCE_EVENTS = 6;
  const MAX_FAMILY_SCIENCE = 5;
  const MAX_ELIMINATION_EVENTS = 2;
  const MAX_ATHLETIC_EVENTS = 3;

  const handleEventChange = (eventCategory, eventName, isGroup = false) => {
    const updatedEvents = [...selectedEvents];
    const eventIndex = updatedEvents.findIndex(
      (e) => e.eventCategory === eventCategory && e.eventName === eventName
    );
    if (eventIndex === -1) {
      updatedEvents.push({ eventCategory, eventName, group: isGroup ? "Group A" : "" });
    } else {
      updatedEvents.splice(eventIndex, 1);
    }
    setSelectedEvents(updatedEvents);
  };

  const validateSelection = () => {
    const totalEvents = selectedEvents.length;
    const performanceCount = selectedEvents.filter(e => e.eventCategory === "Performance").length;
    const familyScienceCount = selectedEvents.filter(e => e.eventCategory === "Family Science").length;
    const eliminationCount = selectedEvents.filter(e => ["Table Tennis", "Chess", "Checkers", "Bible", "Pace Bowl"].includes(e.eventName)).length;
    const athleticCount = selectedEvents.filter(e => e.eventCategory === "Athletic").length;

    if (totalEvents > MAX_EVENTS) return "You can only select up to 13 events.";
    if (performanceCount > MAX_PERFORMANCE_EVENTS) return "You can only select up to 6 performance events.";
    if (familyScienceCount > MAX_FAMILY_SCIENCE) return "You can only enter up to 5 Family Science events.";
    if (eliminationCount > MAX_ELIMINATION_EVENTS) return "You can only enter 2 elimination events.";
    if (athleticCount > MAX_ATHLETIC_EVENTS) return "You can only enter up to 3 athletic events.";
    return "";
  };

  const handleSubmit = () => {
    const errorMessage = validateSelection();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    onSubmit(student.studentName, selectedEvents);
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => setCurrentCategory(e.target.value)}>
          {Object.keys(availableEvents).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        {availableEvents[currentCategory].map((event) => (
          <label key={event}>
            <input
              type="checkbox"
              checked={selectedEvents.some(
                (e) => e.eventCategory === currentCategory && e.eventName === event
              )}
              onChange={() => handleEventChange(currentCategory, event)}
            />
            {event}
          </label>
        ))}
      </div>
      <button onClick={onBack}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventSelectionForm;
