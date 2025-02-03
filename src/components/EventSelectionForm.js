// EventSelectionForm.js
import React, { useState } from "react";

const MAX_EVENTS = 13;
const MAX_PERFORMANCE_EVENTS = 6;
const MAX_ATHLETIC_EVENTS = 3;
const MAX_ELIMINATION_EVENTS = 2;
const GROUP_EVENTS = ["Dramatic Dialogue", "Skit", "Radio Program", "Puppets", "Sign Language Team (5-10)", "Sign Language Team (11-20)", "One Act Play"];

const EventSelectionForm = ({ student, onSubmit, availableEvents, existingSelections, onBack, selectedEventsForAll = {} }) => {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections || []);
  const [error, setError] = useState("");
  const [currentCategory, setCurrentCategory] = useState(Object.keys(availableEvents)[0] || "");

  const handleEventChange = (eventCategory, eventName, isGroup = false) => {
    const updatedEvents = [...selectedEvents];
    const eventIndex = updatedEvents.findIndex(e => e.eventCategory === eventCategory && e.eventName === eventName);
    
    if (eventIndex === -1) {
      const newEvent = { eventCategory, eventName };
      if (GROUP_EVENTS.includes(eventName)) {
        newEvent.group = "Group A";
      }
      updatedEvents.push(newEvent);
    } else {
      updatedEvents.splice(eventIndex, 1);
    }
    setSelectedEvents(updatedEvents);
  };

  const validateSelection = () => {
    const totalEvents = selectedEvents.length;
    const performanceCount = selectedEvents.filter(e => e.eventCategory.includes("Performance")).length;
    const athleticCount = selectedEvents.filter(e => e.eventCategory.includes("Athletic")).length;
    const eliminationCount = selectedEvents.filter(e => ["Table Tennis", "Chess", "Checkers", "Bible Bowl", "Pace Bowl"].includes(e.eventName)).length;

    if (totalEvents > MAX_EVENTS) return "You can only select up to 13 events.";
    if (performanceCount > MAX_PERFORMANCE_EVENTS) return "You can only select up to 6 performance events.";
    if (athleticCount > MAX_ATHLETIC_EVENTS) return "You can only enter up to 3 athletic events.";
    if (eliminationCount > MAX_ELIMINATION_EVENTS) return "You can only enter 2 elimination events.";
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
      <p>Selected Events: {selectedEvents.length} / {MAX_EVENTS}</p>
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => setCurrentCategory(e.target.value)}>
          {Object.keys(availableEvents).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        {availableEvents[currentCategory]?.map(event => (
          <div key={event}>
            <label>
              <input
                type="checkbox"
                checked={selectedEvents.some(e => e.eventCategory === currentCategory && e.eventName === event)}
                onChange={() => handleEventChange(currentCategory, event, GROUP_EVENTS.includes(event))}
              />
              {event}
            </label>
            {GROUP_EVENTS.includes(event) && (
              <select onChange={(e) => handleEventChange(currentCategory, event, e.target.value)}>
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
              </select>
            )}
          </div>
        ))}
      </div>
      <h3>Previously Selected Events:</h3>
      <ul>
        {Object.entries(selectedEventsForAll || {}).map(([studentName, events]) => (
          <li key={studentName}><strong>{studentName}:</strong> {events?.map(e => e.eventName).join(", ") || "No events selected"}</li>
        ))}
      </ul>
      <button onClick={onBack}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventSelectionForm;
