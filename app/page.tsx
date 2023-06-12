'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './styles/globals.css';

interface Country {
  flags: {
    svg: string;
    png: string;
  };
  name: {
    common: string;
    official: string;
  };
  population?: number;
  capital?: string;
  region?: string;
  subregion?: string;
}

// Define regions for the dropdown filter
const regions = [
  { label: 'Africa', value: 'africa' },
  { label: 'America', value: 'americas' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Oceania', value: 'oceania' },
  { label: 'Antarctica', value: 'antarctic' },
];

export default function Page() {
  // State variables
  const [data, setData] = useState<Country[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch data from API when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

// Filter data based on search query and selected region
useEffect(() => {
  let filtered = data;
  if (searchQuery.trim() !== '') {
    filtered = filtered.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedRegion) {
    filtered = filtered.filter((country) => {
  return country.region?.toLowerCase() === selectedRegion;
});

  }
  setFilteredData(filtered);
}, [searchQuery, selectedRegion, data]);



  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // clear the search bar
  const clearSearch = () => {
    setSearchQuery('');
  }

  // Handle region selection in dropdown
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setDropdownOpen(false);
  };


  // Add a new function to handle the button click
const handleResetFilter = () => {
  setSelectedRegion(''); // Reset the selectedRegion value to none
};

  // Handle dropdown button click
  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle clicks outside the dropdown to close it
  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  // Attach event listener for outside clicks when the component mounts
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Render loading state
  if (isLoading) return <div className="h-screen dark:bg-gray-900"><svg className="h-10 w-10 mx-auto my-10 dark:fill-white animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208.6 357.3l-39-13.5c-6.5-2.2-13.6-2.3-20.1-.3l-15.3 4.9c-18.5 5.9-38.5-2.4-47.5-19.5l-3.3-6.2c-10.6-20.1-2.3-45 18.2-54.7l35.3-16.8c2.3-1.1 4.4-2.8 5.9-4.8l5.3-7c7.2-9.6 18.6-15.3 30.6-15.3s23.4 5.7 30.6 15.3l4.6 6.1c2 2.6 4.9 4.5 8.1 5.1c7.8 1.6 15.7-1.5 20.4-7.9l10.4-14.2c2-2.8 5.3-4.4 8.7-4.4c4.4 0 8.4 2.7 10 6.8l10.1 25.9c2.8 7.2 6.7 14 11.5 20.2L311 299.8c5.8 7.4 9 16.6 9 26s-3.2 18.6-9 26L299 367.2c-8.3 10.6-21 16.8-34.4 16.8c-8.4 0-16.6-2.4-23.7-7l-25.4-16.4c-2.2-1.4-4.5-2.5-6.9-3.4zm65.2-214.8L296 164.7c10.1 10.1 2.9 27.3-11.3 27.3H254.8c-5.6 0-11.1-1.2-16.2-3.4l-42.8-19c-14.3-6.3-11.9-27.3 3.4-30.3l38.5-7.7c13.1-2.6 26.7 1.5 36.1 10.9zM248 432c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16s-7.2 16-16 16H264c-8.8 0-16-7.2-16-16zM431.2 298.9l8 24c2.8 8.4-1.7 17.4-10.1 20.2s-17.4-1.7-20.2-10.1l-8-24c-2.8-8.4 1.7-17.4 10.1-20.2s17.4 1.7 20.2 10.1zm-19.9 80.4l-32 32c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l32-32c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></div>

  // Render error state if data couldn't be loaded
  if (!data) return <p>Could not load Country data</p>;

  return (
    <div className="p-4 dark:bg-gray-900 ">
      <div className="relative sm:my-4 sm:mx-5">
      <div className="flex items-center bg-white rounded shadow sm:max-w-sm dark:bg-gray-800 dark:text-white">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 600"
    className="w-10 pl-6 fill-gray-400 flex-shrink-0 dark:bg-gray-800 dark:fill-white"
  >
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
  <input
    type="text"
    placeholder="Search for a country.."
    value={searchQuery}
    onChange={handleSearchChange}
    className="h-12 flex-grow py-2 px-4 bg-transparent text-gray-900 rounded focus:outline-none ml-auto overflow-hidden text-sm font-thin dark:bg-gray-800 dark:text-white"
  />
  {searchQuery && (
    <button onClick={clearSearch} className="p-2">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-gray-500 dark:text-white"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  )}
</div>



      <div ref={dropdownRef} className="sm:absolute sm:right-0 mt-4 h-12 text-xs sm:my-0 sm:top-0 ">
  <button
    className="h-12 w-48 py-3 px-4 bg-white text-gray-900 text-sm font-light rounded shadow flex justify-between dark:bg-gray-800 dark:text-white "
    onClick={handleButtonClick}
  >
    {selectedRegion ? (
      <>
        {regions.find((region) => region.value === selectedRegion)?.label}
        <span
          className="ml-2 flex"
                  onClick={handleResetFilter}
        > <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-gray-500 dark:text-white"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
          <svg className="w-3 h-3 mt-1 ml-2 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                  
        </span>
      </>
    ) : (
      <>
        Filter by Region
        <svg className="w-3 h-3 ml-10 mt-1 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </>
    )}
          </button>
  {isDropdownOpen && (
    <div className="mt-2 absolute top-28 sm:top-11 w-48 bg-white border border-gray-300 shadow rounded z-10 dark:bg-gray-800 dark:border-gray-800 dark:text-white">
      {regions.map((region) => (
        <button
          key={region.value}
          className={`block w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700${
            selectedRegion === region.value ? 'bg-gray-100' : ''
            }`}
          onClick={() => handleRegionChange(region.value)}
        >
          {region.label}
        </button>
      ))}
    </div>
  )}
</div>
        </div>
      <div className="m-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 rounded pt-4 dark:bg-gray-900">   
  {filteredData.length > 0 ? (
    filteredData.map((country: Country) => (
      <Link
        href={`/country/${country.name.common}`}
        key={country.name.common}
        className="block mb-4 -mx-px bg-white rounded shadow hover:shadow-md dark:bg-gray-800 dark:text-white hover:scale-105 duration-300"
      >
        <div className="card flex flex-col justify-between h-full">
          <img tabIndex={-1} className="rounded-t" src={country.flags.png} alt={`${country.name.common} Flag`} />
          <div className="textBox m-4">
            <p tabIndex={0} className="text-gray-900 text-lg font-semibold  dark:text-white">
              {country.name.common}
            </p>
            <div className="my-4 text-sm">
              <p>Population: <span className="font-thin">{country.population}</span></p>
              <p>Region: <span className="font-thin">{country.region}</span></p>
              <p>Capital: <span className="font-thin">{country.capital}</span></p>
            </div>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <div className="w-full text-center text-lg text-gray-900 dark:text-white">
      No countries match your search.
    </div>
  )}
</div>


      </div>
  );
}
