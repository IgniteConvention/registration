import React, { useState } from "react";

const EventSelectionForm = ({ student, onSubmit, availableEvents }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupSelection, setGroupSelection] = useState({});

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
      onSubmit(student.studentName, selectedEvents.map((e) => ({
        ...e,
        group: groupSelection[e.eventName] || "N/A",
      })));
      console.log("Events submitted:", selectedEvents);
    } else {
      console.log("No events selected");
    }
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      <div className="event-categories-container">
        {Object.keys(availableEvents).map((eventCategory) => (
          <div key={eventCategory} className="event-category">
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
                  <input
                    type="text"
                    placeholder="Group (A, B, C)"
                    value={groupSelection[eventName] || ""}
                    onChange={(e) => handleGroupChange(eventName, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
};

export default EventSelectionForm;
