import React from 'react';

export default function App() {
  const [filters, setFilters] = React.useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    const newFilters = value.split(/[ ,]+/).filter(Boolean);
    setFilters(newFilters);
  };

  return (
    <div className="relative rounded-md shadow-sm">
      <input
        className="form-input py-2 pl-10 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        placeholder="Add filters"
        value={filters.join(' ')}
        onChange={handleChange}
      />
      {filters.map((filter) => (
        <span key={filter} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-100 text-gray-800">
          {filter}
          <button
            type="button"
            className="ml-1.5 h-5 w-5 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500"
            aria-label="Remove filter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}

