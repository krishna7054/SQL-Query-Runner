// components/QueryEditor.jsx
import React, { useState } from 'react';

function QueryEditor({ value, onChange, onSubmit }) {
  // State to track if the query has been copied
  const [isCopied, setIsCopied] = useState(false);

  // Handle Ctrl+Enter to run the query
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      onSubmit();
    }
  };

  // Handle the copy button click
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value)
        .then(() => {
          setIsCopied(true); // Update button text to "Copied!"
          setTimeout(() => setIsCopied(false), 1000); // Revert after 1 second
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    } else {
      console.warn('Clipboard API not supported');
    }
  };

  return (
    <div>
      <h2 className='header1'>Custom Query</h2>
    <div className="query-editor">
      <div className='query-buttons'>
      <button className='toggle-history-btn1' onClick={onSubmit}>Run Query</button>
      <button className='toggle-history-btn1' onClick={handleCopy} title="Copy query to clipboard">
        {isCopied ? 'Copied!' : 'Copy Query'}
      </button>
      </div>
      <textarea className='query-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your SQL query here (Press Ctrl+Enter to run)"
        rows={5}
      />
    </div>
    </div>
  );
}

export default React.memo(QueryEditor);