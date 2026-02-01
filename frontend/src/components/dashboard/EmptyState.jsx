import React from "react";
import { Line } from "react-chartjs-2";

const EmptyState = ({ onSignup, onLogin }) => {
  return (
    <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-1 dark:from-blue-500 dark:to-purple-600 rounded-[3rem] shadow-2xl transition-all">
      <div className="bg-white/95 backdrop-blur-2xl dark:bg-gray-900/95 rounded-[2.8rem] p-8 sm:p-12 flex flex-col items-center text-center relative z-10">
        <div className="w-full max-w-md h-40 mb-10 bg-slate-50 dark:bg-gray-800/50 rounded-3xl p-4 border border-blue-100 dark:border-gray-700 relative overflow-hidden group-hover:border-blue-400 transition-colors duration-500">
          <div onClick={onSignup} className="absolute top-4 right-4 z-20 cursor-pointer group/bell">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 z-10 animate-bounce"></div>
              <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm group-hover/bell:bg-blue-600 transition-colors duration-300">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover/bell:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2 px-2">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Demo Tracker</span>
              <span className="text-sm font-bold dark:text-white">Apple Airpods Max</span>
            </div>
            <span className="text-green-500 font-bold text-sm animate-pulse mr-10">-$120.00 Drop</span>
          </div>
          <div className="h-24">
            <Line 
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                  data: [549, 549, 549, 429, 429, 480, 429],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                  tension: 0.5,
                  pointRadius: 0,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { y: { display: false }, x: { display: false } }
              }}
            />
          </div>
        </div>
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400 mb-4">Stop Overpaying.</h2>
        <p className="text-slate-600 dark:text-gray-300 max-w-sm text-lg leading-relaxed mb-8">
          Track any product across the web and get notified the second the price drops. Join <span className="font-bold text-blue-600">PriceWatch</span> today.
        </p>
        <div className="flex flex-col w-full sm:flex-row gap-4 justify-center">
          <button onClick={onSignup} className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/40">Start Tracking Free</button>
          <button onClick={onLogin} className="px-10 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-white font-bold rounded-2xl border-2 border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;