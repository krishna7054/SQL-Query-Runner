// components/ResultsTable.jsx
import React, { useMemo } from 'react';

function ResultsTable({ data, query }) {
  // Memoize the table headers to prevent unnecessary re-renders
  const headers = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter(key => key !== 'photo'); // Exclude photo binary
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="results-table">No results to display</div>;
  }

  return (
    <div className="results-table">
      <h3>Query Results</h3>
      <p className="query-display">Query: {query}</p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={`${index}-${header}`}>
                    {typeof row[header] === 'object' 
                      ? JSON.stringify(row[header])
                      : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(ResultsTable);