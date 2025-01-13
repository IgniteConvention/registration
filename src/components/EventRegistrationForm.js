import React, { useState } from 'react';

const EventRegistrationForm = ({ student, onSubmit, availableEvents }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupSelection, setGroupSelection] = useState({});

  // Handle event selection (checkbox)
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

  // Handle group input for multi-participant events
  const handleGroupChange = (eventName, group) => {
    setGroupSelection((prev) => ({
      ...prev,
      [eventName]: group,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Passing the selected events and group data to the parent component
    onSubmit(student.studentName, selectedEvents.map((e) => ({
      ...e,
      group: groupSelection[e.eventName] || 'N/A',
    })));
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      <div className="event-categories-container">
        {Object.keys(availableEvents).map((eventCategory, index) => (
          <div className="event-category" key={index}>
            <h3>{eventCategory}</h3>
            <div className="event-list">
              <div className="event-container">
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
                    {(
                      eventName.includes('Bible Bowl') ||
                      eventName.includes('Small Ensemble') ||
                      eventName.includes('Skit') ||
                      eventName.includes('Radio Program') ||
                      eventName.includes('400 Meter Relay') ||
                      eventName.includes('Dramatic Dialogues') ||
                      eventName.includes('Male Duet') ||
                      eventName.includes('Science Projects') ||
                      eventName.includes('Instrumental Duet') ||
                      eventName.includes('One-Act Play') ||
                      eventName.includes('Sign Language Team') ||
                      eventName.includes('Choral Groups') ||
                      eventName.includes('Illustrated Story') ||
                      eventName.includes('Puppets')
                    ) && (
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventRegistrationForm;
