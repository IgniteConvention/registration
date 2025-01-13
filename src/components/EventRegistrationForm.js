import React, { useState } from 'react';

const EventRegistrationForm = ({ student, onSubmit, availableEvents }) => {
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
    onSubmit(student.studentName, selectedEvents.map((e) => ({
      ...e,
      group: groupSelection[e.eventName] || 'N/A',
    })));
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      {Object.keys(availableEvents).map((eventCategory, index) => (
        <div key={index}>
          <h3>{eventCategory}</h3>
          {availableEvents[eventCategory].map((eventName) => (
            <div key={eventName}>
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
              {/* Display group option for multi-participant events */}
              {eventName.includes('Bible Bowl') || eventName.includes('Small Ensemble') ? (
                <div>
                  <label>
                    Group: 
                    <input
                      type="text"
                      placeholder="Enter Group (A, B, etc.)"
                      value={groupSelection[eventName] || ''}
                      onChange={(e) => handleGroupChange(eventName, e.target.value)}
                    />
                  </label>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventRegistrationForm;
