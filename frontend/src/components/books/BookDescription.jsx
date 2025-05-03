import React from 'react';

export default function BookDescription({ description }) {
  return (
    <div>
      <h3>Description</h3>
      <p>{description}</p>
    </div>
  );
}