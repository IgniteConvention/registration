import React, { useState } from 'react';

const EventSelectionForm = ({ student, onSubmit, availableEvents }) => {
  // Ensure that student is defined before proceeding
  if (!student) {
    return <div>Loading...</div>; // Or you can handle it with a more meaningful fallback message
  }

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [groupSelection, setGroupSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
    if (selectedEvents.length > 0) {
      onSubmit(student.studentName, selectedEvents.map((e) => ({
        ...e,
        group: groupSelection[e.eventName] || 'N/A',
      })));
      console.log('Events submitted:', selectedEvents);
    } else {
      console.log('No events selected');
    }
  };

  // Pagination handling logic
  const totalPages = Math.ceil(Object.keys(availableEvents).length / itemsPerPage);
  const categoriesPerPage = Object.keys(availableEvents).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2>Register Events for {student.studentName}</h2>
      <div className="event-categories-container">
        {categoriesPerPage.map((eventCategory, index) => (
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

                  {/* Group selection for multi-participant events */}
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

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventSelectionForm;
