import React, { useState } from "react";

export default function EventSelectionForm({ student, onSubmit }) {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleCheckboxChange = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleSubmit = () => {
    onSubmit(student.studentName, selectedEvents);
  };

  return (
    <div className="container event-selection">
      <h2>Event Selection for {student.studentName}</h2>
      <div>
        {["Event A", "Event B", "Event C"].map((event) => (
          <div key={event}>
            <label>
              <input
                type="checkbox"
                checked={selectedEvents.includes(event)}
                onChange={() => handleCheckboxChange(event)}
              />
              {event}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
}
