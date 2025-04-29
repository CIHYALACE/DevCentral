import React from 'react';

const ProgramCard = ({ program }) => {
  return (
    <div className="program-card border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{program.title}</h2>
      <p className="text-gray-600">{program.description}</p>
      <p><strong>Type:</strong> {program.type}</p>
      <p><strong>Price:</strong> ${program.price}</p>
      <p><strong>Downloads:</strong> {program.download_count}</p>
      <a href={program.download_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        Download Link
      </a>
    </div>
  );
};

export default ProgramCard;