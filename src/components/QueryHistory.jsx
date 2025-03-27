// components/QueryHistory.jsx
import React from 'react';

function QueryHistory({ history, onSelect, onClose }) {
  if (history.length === 0) {
    return (
      <div className="query-history-content">
        <div className="header">
          <h3>Query History</h3>
          <button  onClick={onClose}>X</button>
        </div>
        <p>No queries yet.</p>
      </div>
    );
  }

  return (
    <div className="query-history-content">
      <div className="header">
        <h3>Query History</h3>
        <button onClick={onClose}>X</button>
      </div>
      <ul>
        {history.map((entry, index) => (
          <li key={index} onClick={() => onSelect(entry.query)}>
            <div className="timestamp">{entry.timestamp}</div>
            <div className="query-text">{entry.query}</div>
            <div className="row-count">Rows: {entry.rowCount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(QueryHistory);