import React from "react";

const FirstItemCTA = ({ onAddClick }) => {
  return (
    <div className="relative overflow-hidden p-12 flex flex-col items-center justify-center text-center bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-[3rem] border-2 border-dashed border-blue-200 dark:border-gray-700 shadow-sm transition-all group/container">
      <div className="relative mb-8">
        <div 
          onClick={onAddClick} 
          className="cursor-pointer relative z-10 w-24 h-24 bg-gradient-to-b from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/30 transform transition-all duration-500 group-hover/container:scale-110 group-hover/container:rotate-3"
        >
          <span className="text-white text-5xl font-extralight transition-transform group-hover/container:rotate-90 duration-500">+</span>
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
        Ready for your first hunt?
      </h3>
      <p className="text-slate-500 dark:text-gray-400 max-w-[280px] text-sm leading-relaxed mb-8">
        Your watchlist is a blank canvas. Drop a product link here and let us handle the price stalking.
      </p>
      <button 
        onClick={onAddClick} 
        className="px-10 py-4 bg-slate-900 dark:bg-white dark:text-gray-900 text-white font-black rounded-2xl transition-all active:scale-95 hover:shadow-2xl"
      >
        Add Your First Item
      </button>
    </div>
  );
};

export default FirstItemCTA;