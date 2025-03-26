// components/QueryEditor.jsx
import React from 'react';

function QueryEditor({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="query-editor">
      <h3>Custom Query</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your SQL query here (Press Ctrl+Enter to run)"
        rows={5}
      />
      <button onClick={onSubmit}>Run Query</button>
    </div>
  );
}

export default React.memo(QueryEditor);