import { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added Link for navigation
import logo from '../assets/logo.jpg'; 
import addcartlogo from '../assets/addcartlogo.jpg';
import darklogo from '../assets/darklogo.jpg'

// Added 'token' to props to check login status
function Navbar({ onAddProductClick, theme, toggleTheme, onLogout, token }) {
  return (
    <div className="flex flex-col md:flex-row justify-between p-4 
                    bg-white dark:bg-gray-800 transition-colors duration-300">
      
      <div className="flex gap-2 items-center">
        <img src={theme=="light"?logo:darklogo} alt="PriceWatch Logo" className="h-7 w-7" />
        <h1 className="font-bold text-xl text-black dark:text-white">
          PriceWatch Tracker
        </h1>
      </div>

      <div className="flex gap-4 items-center mt-2 md:mt-0 flex-row justify-between p-5 ">
        
        {/* Track Product Button - Stay same */}
        <button 
          onClick={onAddProductClick}
          className="flex items-center bg-blue-500 dark:bg-blue-900 text-white font-semibold py-1 px-3 rounded"
        >
          Track New Product
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-7 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>

        {/* Toggle Dark Mode Button - Stay same */}
        <button
          onClick={toggleTheme}
          className="text-sm sm:text-xl p-1 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transform transition-all duration-300 hover:rotate-12 hover:scale-110 flex items-center justify-center"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* --- CONDITIONAL LOGIC FOR LOGIN / LOGOUT --- */}
        {token ? (
          /* Show LOGOUT if logged in */
          <button
            onClick={onLogout}
            className="text-sm sm:text-lg p-1 sm:p-2 rounded-lg bg-red-50 dark:bg-red-700/30 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 flex items-center justify-center"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        ) : (
          /* Show LOGIN/SIGNUP if not logged in */
          <div className="flex gap-2">
            <Link 
              to="/login" 
              className="text-sm font-bold text-blue-600 dark:text-blue-400 p-2 hover:underline"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Navbar;