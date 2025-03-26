// src/App.js
import React, { useState } from 'react';
import './App.css';

const predefinedQueries = [
  { 
    id: 1, 
    query: 'SELECT * FROM users', 
    data: [
      ['ID', 'Name', 'Age'],
      [1, 'Alice', 25],
      [2, 'Bob', 30],
      [3, 'Charlie', 35],
    ] 
  },
  { 
    id: 2, 
    query: 'SELECT * FROM products WHERE price > 100', 
    data: [
      ['Product', 'Price'],
      ['Laptop', 1200],
      ['Phone', 800],
    ] 
  },
];

function App() {
  const [selectedQuery, setSelectedQuery] = useState(predefinedQueries[0]);
  const [queryInput, setQueryInput] = useState(predefinedQueries[0].query); // Editable query
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle query selection from dropdown
  const handleQuerySelect = (e) => {
    const queryObj = predefinedQueries.find(q => q.id === parseInt(e.target.value));
    setSelectedQuery(queryObj);
    setQueryInput(queryObj.query); // Sync textarea with selected query
  };

  // Handle manual query input
  const handleQueryChange = (e) => {
    setQueryInput(e.target.value);
  };

  // Simulate running the query
  const runQuery = () => {
    setLoading(true);
    setTimeout(() => {
      // Use the predefined data for the selected query, even if input is modified
      setHistory([{ id: selectedQuery.id, query: queryInput, data: selectedQuery.data }, ...history.slice(0, 4)]);
      setLoading(false);
    }, 500); // Simulate loading
  };

  // Export table data to CSV
  const exportToCSV = () => {
    const csv = selectedQuery.data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_result.csv';
    a.click();
  };

  return (
    <div className="App">
      <header>
        <select onChange={handleQuerySelect}>
          {predefinedQueries.map(q => (
            <option key={q.id} value={q.id}>
              Query {q.id}
            </option>
          ))}
        </select>
      </header>

      <main>
        <textarea 
          value={queryInput} 
          onChange={handleQueryChange} 
          rows={5} 
          placeholder="Type or edit your SQL query here..."
        />
        <button onClick={() => navigator.clipboard.writeText(queryInput)}>
          Copy Query
        </button>
        <button onClick={runQuery}>Run Query</button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table>
              <tbody>
                {selectedQuery.data.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={exportToCSV}>Export as CSV</button>
          </div>
        )}
      </main>

      <footer>
        <h3>Query History</h3>
        <ul>
          {history.map((q, idx) => (
            <li 
              key={idx} 
              onClick={() => {
                setSelectedQuery(q);
                setQueryInput(q.query);
              }}
            >
              {q.query.substring(0, 20)}...
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

export default App;