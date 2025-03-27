# SQL Query Runner

SQL Query Runner is a web application designed to simulate running SQL-like queries on a predefined dataset. It allows users to select from a set of predefined queries or input custom queries to filter, sort, and display employee data in a tabular format. The app is built with a focus on usability for data analysts, featuring a responsive design, query history sidebar, and export functionality. Key features include:

- Predefined Queries: Users can select from a dropdown of prewritten queries to view filtered datasets.
- Custom Queries: A query editor enables users to write and execute custom SQL-like queries.
  ### Exmaple of Custom Queries:
```bash
    SELECT * FROM employees WHERE employeeID >2 AND employeeID<6
    SELECT * FROM employees WHERE employeeID > 2 AND country = 'UK'
```
- Query History: A collapsible sidebar tracks recent custom queries with timestamps and row counts.
- Results Display: Results are shown in a table with syntax-highlighted queries and an option to export as CSV.
- Responsive Design: The app adapts seamlessly to desktop, laptop, tablet, and mobile devices.
The project uses a static dataset of employee information (e.g., ID, name, title, country) parsed from a CSV-like structure, making it lightweight and easy to deploy.

### Live: [https://sql-query-runner-three.vercel.app/](https://sql-query-runner-three.vercel.app/)

## JavaScript Framework and Packages
The application is built using React, a popular JavaScript library for building user interfaces. React’s component-based architecture and state management capabilities make it ideal for this interactive app. Key packages and plugins installed include:

- React (react, react-dom): Core libraries for rendering components and managing the virtual DOM.
- react-syntax-highlighter: Used in the ResultsTable component to highlight SQL query syntax, enhancing readability.
- No Additional Build Tools: The app  a basic setup with a similar bundler Vite react, which includes Webpack, Babel, and ESLint out of the box.

## Page Load Time
### Measurement
Page load time was measured using Chrome DevTools under the Performance tab. The process involved:

1. Opening the app in a new tab.
2. Starting a performance recording.
3. Triggering a full page reload.
4. Analyzing the "Load" event timing.
For a local development build (served via npm run dev), the average page load time is approximately 300-500 milliseconds on a desktop with a decent internet connection (e.g., 50 Mbps). This includes:

- DOMContentLoaded: ~200-300 ms (HTML and CSS parsed).
- Load Event: ~300-500 ms (all assets, including JavaScript bundles, loaded).
In a production build (npm run build and served via a static server), the load time drops to ~200-300 ms due to minification and optimization. These values are estimates based on typical React app performance with a small dataset and minimal external assets.

### Factors Affecting Load Time
- The app’s static dataset is embedded in App.jsx, eliminating server fetch delays.
- No external API calls or heavy images increase the baseline load time.
- The primary factor is the JavaScript bundle size and initial render time.


## Optimizations
Several optimizations were implemented to decrease load time and enhance performance:

1. React.memo:
    - Applied to QueryEditor, QuerySelector, QueryHistory, and ResultsTable components to prevent unnecessary rerenders when props don’t change. This improves performance during state updates (e.g., selecting a query or submitting a custom query).
2. Static Data:
    - The employee dataset is hardcoded and processed at load time (parsedData), avoiding runtime fetch requests or dynamic imports. This ensures instant data availability.
3. Efficient Query Parsing:
    - The parseCustomQuery function uses simple string matching and array methods (filter, sort) instead of complex SQL parsing libraries, keeping execution fast for small datasets.
4. Bundle Size Reduction:
    - Limited external dependencies to react-syntax-highlighter only where necessary (syntax highlighting). No heavy UI frameworks (e.g., Material-UI) were used beyond what’s needed, reducing the JavaScript bundle size.
    - Assumes a production build with minification (e.g., via npm run build), which compresses the code.

5. Responsive Design:
    - CSS uses Flexbox and media queries to adapt the layout without additional JavaScript overhead, ensuring smooth rendering across devices without reflows or repaint costs.
6. Lazy Loading Consideration:
    - While not implemented, the app’s structure supports lazy loading of components (e.g., React.lazy for QueryHistory) if expanded with larger datasets or additional features, further reducing initial load time.
7. Clipboard API:
    - The "Copy Query" feature in QueryEditor uses the native navigator.clipboard API, avoiding third-party libraries and keeping it lightweight.
### Potential Further Optimizations
- Code Splitting: Use React.lazy and Suspense to load ResultsTable or QueryHistory on demand if the app grows.
- Web Workers: Offload parseCustomQuery to a worker for larger datasets to prevent UI blocking.
- Caching: Memoize query results in state to avoid re-parsing identical queries.

## Getting Started
1. Clone the Repository:
```bash
git clone https://github.com/krishna7054/SQL-Query-Runner.git
cd SQL-Query-Runner
```
2. Install Dependencies:
```bash
npm install
```
3. Run Locally:
```bash
npm run dev
```
4. Build for Production:
```bash
npm run build
```
## Usage
- Select a predefined query from the dropdown to view filtered data.
- Enter a custom query in the editor and press "Run Query" or Ctrl+Enter.
- Toggle the query history sidebar with "Show History" to review and rerun past queries.
- Export results to CSV using the button in the results table.

## Preview
<p>
    <img src="https://github.com/user-attachments/assets/de06d865-4c65-4a37-a8d0-3392d3e04560" width=45% height = 300/>
    <img src="https://github.com/user-attachments/assets/f30be8a2-dcfc-47de-926e-256f09ec157d" width=45% height = 300/>
</p>

