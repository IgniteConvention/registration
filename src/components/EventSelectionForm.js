// EventSelectionForm.js
import React, { useState, useEffect } from "react";
import "./EventSelectionForm.css";

const MAX_EVENTS = 13;
const MAX_PERFORMANCE_EVENTS = 6;
const MAX_ATHLETIC_EVENTS = 3;
const MAX_ELIMINATION_EVENTS = 2;
const GROUP_EVENTS = ["Dramatic Dialogue", "Skit", "Radio Program", "Puppets", "Sign Language Team (5-10)", "Sign Language Team (11-20)", "One Act Play"];

const EventSelectionForm = ({ student, onSubmit, availableEvents, existingSelections, onBack, selectedEventsForAll = {}, onEdit }) => {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections || []);
  const [error, setError] = useState("");
  const [currentCategory, setCurrentCategory] = useState(Object.keys(availableEvents)[0] || "");

  useEffect(() => {
    setSelectedEvents(existingSelections || []);
  }, [existingSelections]);

  const handlePrint = () => {
    window.print();
  };

  const handleEventChange = (eventCategory, eventName) => {
    setSelectedEvents(prev => {
      const updatedEvents = [...prev];
      const eventIndex = updatedEvents.findIndex(e => e.eventCategory === eventCategory && e.eventName === eventName);
      
      if (eventIndex === -1) {
        updatedEvents.push({ eventCategory, eventName, group: GROUP_EVENTS.includes(eventName) ? "Group A" : "" });
      } else {
        updatedEvents.splice(eventIndex, 1);
      }
      return updatedEvents;
    });
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
    <div className="event-selection-container">
      <div className="instruction-box">
        <p><strong>Instructions:</strong> Please select up to 13 events for {student.studentName}. Performance events are limited to 6, athletic events to 3, and elimination events to 2.</p>
      </div>
      <h2>Register Events for {student.studentName}</h2>
      {error && <p className="error-message">{error}</p>}
      <p>Selected Events: {selectedEvents.length} / {MAX_EVENTS}</p>
      <div className="category-filter">
        <label>Filter by Category:</label>
        <select value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}>
          {Object.keys(availableEvents).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="event-list">
        {availableEvents[currentCategory]?.map(event => (
          <div key={event} className="event-item">
            <label>
              <input
                type="checkbox"
                checked={selectedEvents.some(e => e.eventCategory === currentCategory && e.eventName === event)}
                onChange={() => handleEventChange(currentCategory, event)}
              />
              {event}
            </label>
            {GROUP_EVENTS.includes(event) && (
              <select
                value={selectedEvents.find(e => e.eventName === event)?.group || "Group A"}
                onChange={(e) => {
                  setSelectedEvents(prev => prev.map(ev => ev.eventName === event ? { ...ev, group: e.target.value } : ev));
                }}
              >
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
              </select>
            )}
          </div>
        ))}
      </div>
      <h3>Previously Selected Events:</h3>
      <ul className="selected-events-list">
        {Object.entries(selectedEventsForAll || {}).map(([studentName, events]) => (
          <li key={studentName}>
            <strong>{studentName}:</strong> {events?.map(e => `${e.eventName} (${e.group || "Solo"})`).join(", ") || "No events selected"}
            <button className="edit-button" onClick={() => onEdit(studentName)}>Edit</button>
          </li>
        ))}
      </ul>
      <div className="button-group">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button className="print-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default EventSelectionForm;
