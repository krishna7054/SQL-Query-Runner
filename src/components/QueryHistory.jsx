// components/QueryHistory.jsx
import React from 'react';

function QueryHistory({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="query-history">
      <h3>Recent Queries</h3>
      <ul>
        {history.map((query, index) => (
          <li key={index} onClick={() => onSelect(query)}>
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QueryHistory;