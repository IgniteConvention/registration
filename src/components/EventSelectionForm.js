
import React, { useState } from "react";

export default function EventSelectionForm({
  student,
  availableEvents,
  existingSelections,
  onSubmit
}) {
  const [selectedEvents, setSelectedEvents] = useState(existingSelections || []);
  const [groupDesignations, setGroupDesignations] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const categories = Object.keys(availableEvents);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleEventChange = (event) => {
    if (selectedEvents.some((e) => e.name === event)) {
      setSelectedEvents(selectedEvents.filter((e) => e.name !== event));
      const updatedGroups = { ...groupDesignations };
      delete updatedGroups[event];
      setGroupDesignations(updatedGroups);
    } else {
      setSelectedEvents([...selectedEvents, { name: event }]);
    }
  };

  const handleGroupChange = (event, group) => {
    setGroupDesignations({ ...groupDesignations, [event]: group });
  };

  const handleSubmit = () => {
    const eventsWithGroups = selectedEvents.map((e) => ({
      ...e,
      group: groupDesignations[e.name] || null
    }));
    onSubmit(student.studentName, eventsWithGroups);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <h2>Event Selection for {student.studentName}</h2>
      {paginatedCategories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {availableEvents[category].map((event) => (
              <li key={event}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedEvents.some((e) => e.name === event)}
                    onChange={() => handleEventChange(event)}
                  />
                  {event}
                </label>
                {["Bible Bowl", "Small Ensemble", "Skit"].includes(event) && (
                  <input
                    type="text"
                    placeholder="Group (e.g., A, B)"
                    value={groupDesignations[event] || ""}
                    onChange={(e) => handleGroupChange(event, e.target.value)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <button onClick={handleSubmit}>Submit Events</button>
    </div>
  );
}
