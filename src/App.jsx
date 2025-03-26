import React, { useState } from 'react';
import QueryEditor from './components/QueryEditor';
import ResultsTable from './components/ResultsTable';
import QuerySelector from './components/QuerySelector';
import QueryHistory from './components/QueryHistory'; // New component
import './App.css';

// Sample CSV data (replace with your actual data)
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
  {
    id: 1,
    text: 'SELECT * FROM employees WHERE title = "Sales Representative"',
    dataKey: 'salesReps'
  },
  {
    id: 2,
    text: 'SELECT * FROM employees WHERE country = "UK"',
    dataKey: 'ukEmployees'
  },
  {
    id: 3,
    text: 'SELECT * FROM employees ORDER BY employeeID',
    dataKey: 'allEmployees'
  }
];

// Query parser (simplified; adjust to match your implementation)
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
  const [queryHistory, setQueryHistory] = useState([]); // New state for query history

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

    // Add to history (keep unique and limit to 10)
    setQueryHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)];
      return newHistory.slice(0, 10);
    });
  };

  const displayedData = customResults !== null ? customResults : employeeData[selectedQuery.dataKey];

  return (
    <div className="app-container">
      <h1>SQL Query Runner</h1>
      <div className="main-layout">
        <div className="query-section">
          <QuerySelector 
            queries={predefinedQueries}
            onQuerySelect={handleQuerySelect}
            selectedQueryId={selectedQuery.id}
          />
          <QueryEditor
            value={customQuery}
            onChange={setCustomQuery}
            onSubmit={() => handleCustomQuerySubmit()}
          />
          <QueryHistory 
            history={queryHistory} 
            onSelect={handleCustomQuerySubmit} 
          />
        </div>
        <ResultsTable 
          data={displayedData}
          query={selectedQuery.text}
        />
      </div>
    </div>
  );
}

export default App;