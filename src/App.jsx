import React, { useState } from 'react';
import QueryEditor from './components/QueryEditor.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import QuerySelector from './components/QuerySelector.jsx';
import QueryHistory from './components/QueryHistory.jsx';
import './App.css';

// Sample CSV data
const csvData = [
  ['employeeID', 'lastName', 'firstName', 'title', 'country'],
  ['1', 'Davolio', 'Nancy', 'Sales Representative', 'USA'],
  ['2', 'Fuller', 'Andrew', 'Vice President Sales', 'USA'],
  ['3', 'Leverling', 'Janet', 'Sales Representative', 'USA'],
  ['4', 'Peacock', 'Margaret', 'Sales Representative', 'USA'],
  ['5', 'Buchanan', 'Steven', 'Sales Manager', 'UK'],
  ['6', 'Suyama', 'Michael', 'Sales Representative', 'UK'],
  ['7', 'King', 'Robert', 'Sales Representative', 'UK'],
  ['8', 'Callahan', 'Laura', 'Inside Sales Coordinator', 'USA'],
  ['9', 'Dodsworth', 'Anne', 'Sales Representative', 'UK'],
];

// Process the CSV data
const parsedData = csvData.slice(1).map(row => ({
  employeeID: parseInt(row[0]),
  lastName: row[1],
  firstName: row[2],
  title: row[3],
  country: row[4]
}));

const employeeData = {
  salesReps: parsedData.filter(employee => employee.title === 'Sales Representative'),
  ukEmployees: parsedData.filter(employee => employee.country === 'UK'),
  allEmployees: parsedData
};

const predefinedQueries = [
  { id: 1, text: 'SELECT * FROM employees WHERE title = "Sales Representative"', dataKey: 'salesReps' },
  { id: 2, text: 'SELECT * FROM employees WHERE country = "UK"', dataKey: 'ukEmployees' },
  { id: 3, text: 'SELECT * FROM employees ORDER BY employeeID', dataKey: 'allEmployees' }
];

// Query parser
const parseCustomQuery = (query, data) => {
  if (!query) return data.allEmployees;
  let result = [...data.allEmployees];
  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery.includes('where')) {
    const condition = normalizedQuery.split('where')[1].trim();
    if (condition.includes('title')) {
      const value = condition.split('=')[1].trim().replace(/['"]/g, '');
      result = result.filter(row => row.title.toLowerCase() === value);
    } else if (condition.includes('country')) {
      const value = condition.split('=')[1].trim().replace(/['"]/g, '');
      result = result.filter(row => row.country.toLowerCase() === value);
    }
  }

  if (normalizedQuery.includes('order by')) {
    const field = normalizedQuery.split('order by')[1].trim();
    result.sort((a, b) => a[field] > b[field] ? 1 : -1);
  }

  return result;
};

function App() {
  const [selectedQuery, setSelectedQuery] = useState(predefinedQueries[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [customResults, setCustomResults] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // New state for sidebar

  const handleQuerySelect = (queryId) => {
    const query = predefinedQueries.find(q => q.id === queryId);
    setSelectedQuery(query);
    setCustomResults(null);
    setCustomQuery('');
  };

  const handleCustomQuerySubmit = (queryToRun) => {
    const query = queryToRun || customQuery;
    if (!query.trim()) return;

    const results = parseCustomQuery(query, employeeData);
    setCustomResults(results);
    setSelectedQuery({
      id: 0,
      text: query,
      dataKey: null
    });

    // Add to history with timestamp and row count
    setQueryHistory(prev => {
      const newEntry = {
        query,
        timestamp: new Date().toLocaleString(),
        rowCount: results.length
      };
      return [newEntry, ...prev.filter(item => item.query !== query)].slice(0, 10);
    });
  };

  const displayedData = customResults !== null ? customResults : employeeData[selectedQuery.dataKey];

  return (
    <div className="app-container">
      <h1 className="header">SQL Query Runner</h1>
      <div className="main-layout">
        <div className="query-section">
          <QueryEditor
            value={customQuery}
            onChange={setCustomQuery}
            onSubmit={() => handleCustomQuerySubmit()}
          />
          <button 
            className="toggle-history-btn" 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          >
            {isHistoryOpen ? 'Hide History' : 'Show History'}
          </button>
          <QuerySelector 
            queries={predefinedQueries}
            onQuerySelect={handleQuerySelect}
            selectedQueryId={selectedQuery.id}
          />
          <ResultsTable 
            data={displayedData}
            query={selectedQuery.text}
          />
        </div>
        <div className={`query-history-sidebar ${isHistoryOpen ? 'open' : ''}`}>
          <QueryHistory 
            history={queryHistory} 
            onSelect={handleCustomQuerySubmit}
            onClose={() => setIsHistoryOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;