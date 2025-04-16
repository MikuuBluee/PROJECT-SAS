import React from 'react'

function Navbar() {
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
            <img className='w-30 cursor-pointer' src="/public/aero-logo.png" alt="" />
        </div>
        <div className="search-bar flex items-center">
            <input type="text" placeholder="Search..." className="p-2 rounded-1-md ring-gray-300 ring-2 h-8" />
            <button className="bg-blue-500 text-white p-2 rounded-r-md ring-2 ring-gray-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </div>
            
       
        <div className="">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-user text-gray-700"></i>
                    <a href="#" class="text-gray-700 font-medium">Account</a>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="fas fa-shopping-cart text-gray-700"></i>
                    <a href="#" class="text-gray-700 font-medium">Cart</a>
                </div>
        </div>
        <div className="">
            
            <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Menu<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>


            <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kategori</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign In</a>
                </li>
                </ul>
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
