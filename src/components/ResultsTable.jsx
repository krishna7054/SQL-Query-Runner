// components/ResultsTable.jsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ResultsTable({ data, query }) {
  const generateCSV = () => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    return [headers, ...rows].join('\n');
  };

  const handleExport = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-table">
      <h2 className='header1'>Query Results</h2>
      <div className="query-display">
        <h4 className='header2'>Query:</h4>
        <SyntaxHighlighter language="sql" style={dark}>
          {query}
        </SyntaxHighlighter>
      </div>
      <div className="results-info">
        <p>Showing {data.length} rows</p>
        {data.length === 0 && <p>No results found for this query.</p>}
      </div>
      {data.length > 0 && (
        <>
          <button onClick={handleExport}>Export to CSV</button>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map(header => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(ResultsTable);