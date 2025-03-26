// components/QuerySelector.jsx
import React from 'react';


function QuerySelector({ queries, onQuerySelect, selectedQueryId }) {
  return (
    <div className="query-selector">
      <h2 className='header1'>Predefined Queries</h2>
      <select 
        value={selectedQueryId}
        onChange={(e) => onQuerySelect(parseInt(e.target.value))}
      >
        {queries.map(query => (
          <option key={query.id} value={query.id}>
            {query.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.memo(QuerySelector);