// src/components/StatsSummary.jsx
import React from 'react';

function StatsSummary({ totalItems, avgChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {/* Total Items Tracking */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md flex justify-between items-center transition-colors">
        <div>
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            Total Items Tracking
          </h3>
          <p className="text-2xl font-bold mt-1 dark:text-white">{totalItems}</p>
          <p className="text-blue-500 dark:text-blue-400 text-sm cursor-pointer mt-1">
            View History
          </p>
        </div>
      </div>

      {/* Average Price Change */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md flex justify-between items-center transition-colors">
        <div>
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            Average Price Change
          </h3>
          <p
            className={`text-2xl font-bold mt-1 ${
              avgChange >= 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            }`}
          >
            {avgChange}%
          </p>
          <p className="text-blue-500 dark:text-blue-400 text-sm cursor-pointer mt-1">
            View History
          </p>
        </div>
        <div
          className={`font-semibold px-3 py-1 rounded-full ${
            avgChange >= 0
              ? "text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-800"
              : "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-800"
          } transition-colors`}
        >
          {avgChange >= 0 ? `+${avgChange}%` : `${avgChange}%`}
        </div>
      </div>
    </div>
  );
}

export default StatsSummary;
