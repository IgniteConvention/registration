import React, { useState } from "react";

const EventSelectionForm = ({ student, onSubmit, availableEvents, existingSelections }) => {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections);

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

  const handleSubmit = () => {
    if (selectedEvents.length > 0) {
      onSubmit(student.studentName, selectedEvents); // Submit events for the student
    }
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      {Object.keys(availableEvents).map((category) => (
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

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventSelectionForm;
