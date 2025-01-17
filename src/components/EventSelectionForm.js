import React, { useState } from 'react';
import '../App.css';  // Corrected the import path for CSS

const EventSelectionForm = ({ student, onSubmit, availableEvents }) => {
  if (!student) {
    return <div>Loading...</div>;
  }

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
        group: groupSelection[e.eventName] || 'N/A',
      })));
    } else {
      console.log('No events selected');
    }
  };

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      <div className="event-categories-container">
        {Object.keys(availableEvents).map((eventCategory, index) => (
          <div className="event-category" key={index}>
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
                  {[
                    "Bible Bowl", "Small Ensemble", "Skit", "Radio Program", "Dramatic Dialogues",
                    "400 Meter Relay", "Science Projects", "Instrumental Duet", "Sign Language Team"
                  ].includes(eventName) && (
                    <div>
                      <label>
                        Group: 
                        <input
                          type="text"
                          placeholder="Group (A, B, C, etc.)"
                          value={groupSelection[eventName] || ''}
                          onChange={(e) => handleGroupChange(eventName, e.target.value)}
                        />
                      </label>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventSelectionForm;
