import React, { useState } from 'react';

function EventRegistrationForm({ student, onSubmit, availableEvents }) {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedEvents((prevEvents) =>
      prevEvents.includes(value)
        ? prevEvents.filter((event) => event !== value)
        : [...prevEvents, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(student.studentName, selectedEvents); // Submit the selected events
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Register Events for {student.studentName}</h2>
        
        <form onSubmit={handleSubmit}>
          <h3>Select Events</h3>

          {/* Loop through categories and events */}
          {availableEvents.map((category, categoryIndex) => (
            <div key={categoryIndex} className="category-section">
              <h4>{category.category}</h4>
              <div className="events-list">
                {category.events.map((event, index) => (
                  <label key={index} className="event-item">
                    <input
                      type="checkbox"
                      value={event}
                      onChange={handleCheckboxChange}
                      checked={selectedEvents.includes(event)}
                    />
                    {event}
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          <button type="submit">Save Events</button>
        </form>
      </div>
    </div>
  );
}

export default EventRegistrationForm;
