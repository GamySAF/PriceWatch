import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white/40 backdrop-blur-md dark:bg-gray-800/40 p-6 rounded-[2rem] border border-white/40 dark:border-gray-700 animate-pulse flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="flex-1 w-full">
            <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded-full w-3/4 mb-4"></div>
            <div className="flex gap-4">
              <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-24"></div>
              <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-24"></div>
            </div>
          </div>
          <div className="h-10 bg-slate-200 dark:bg-gray-700 rounded-full w-20 mt-4 sm:mt-0"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;