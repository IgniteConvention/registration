import React, { useState } from 'react';

const EventRegistrationForm = ({ student, onSubmit, availableEvents }) => {
  // Ensure the student object exists before proceeding
  if (!student) {
    return <div>Loading...</div>; // or handle this gracefully
  }

  const [selectedEvents, setSelectedEvents] = useState({});
  const [groupName, setGroupName] = useState("");

  // Handle change for group name field (dropdown)
  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  // Handle checkbox change for event selection
  const handleEventChange = (category, event) => {
    setSelectedEvents((prev) => {
      const updated = { ...prev };
      if (!updated[category]) {
        updated[category] = [];
      }
      if (updated[category].includes(event)) {
        updated[category] = updated[category].filter(e => e !== event);
      } else {
        updated[category].push(event);
      }
      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventsWithGroups = Object.entries(selectedEvents).map(([category, events]) => ({
      category,
      events: events.map(event => ({
        event,
        groupName: category.includes("Ensemble") || category.includes("Skit") ? groupName : null,
      }))
    }));
    onSubmit(student.studentName, eventsWithGroups);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Events for {student.studentName}</h2>
      {Object.keys(availableEvents).map((category, index) => (
        <div key={index}>
          <h3>{category}</h3>
          {availableEvents[category].map((event, idx) => (
            <label key={idx}>
              <input 
                type="checkbox" 
                onChange={() => handleEventChange(category, event)} 
              />
              {event}
            </label>
          ))}
        </div>
      ))}
      
      {/* Group Name dropdown for group-based events */}
      {Object.keys(selectedEvents).some(category => category.includes('Ensemble') || category.includes('Skit')) && (
        <div>
          <label>Group Name (e.g., Group A, Group B, Group C, Group D):</label>
          <select value={groupName} onChange={handleGroupNameChange}>
            <option value="">Select Group</option>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="C">Group C</option>
            <option value="D">Group D</option>
          </select>
        </div>
      )}

      <button type="submit">Submit Events</button>
    </form>
  );
};

export default EventRegistrationForm;
