'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './styles/globals.css';

interface Country {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  population: number;
  capital: string;
  region: string;
}

// Define regions for the dropdown filter
const regions = [
  { label: 'Africa', value: 'africa' },
  { label: 'America', value: 'americas' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Oceania', value: 'oceania' },
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

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filtered = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle region selection in dropdown
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setDropdownOpen(false);
  };

  // Fetch data based on selected region
  useEffect(() => {
    if (selectedRegion) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [selectedRegion]);

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
  if (isLoading) return <p>Loading...</p>;

  // Render error state if data couldn't be loaded
  if (!data) return <p>Could not load Country data</p>;

  return (
    <div className="p-4 ">
      <div className="relative sm:my-4">
      <div className="flex items-center bg-white rounded shadow sm:max-w-sm sm:h-10">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 600"
    className="w-10 h-10 pl-6 fill-gray-400 flex-shrink-0"
  >
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
  <input
    type="text"
    placeholder="Search for a country.."
    value={searchQuery}
    onChange={handleSearchChange}
    className="flex-grow py-2 px-4 bg-transparent text-gray-900 rounded focus:outline-none ml-auto overflow-hidden text-sm font-thin"
  />
</div>


      <div ref={dropdownRef} className="sm:absolute sm:right-0 mt-4 h-10 text-xs sm:my-0 sm:top-0">
        <button
          className="w-48 py-2.5 px-4 bg-white text-gray-900 text-sm font-light rounded shadow flex"
          onClick={handleButtonClick}
        >
          Filter by Region
          <svg className="w-3 h-3 ml-10 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-28 sm:top-11 w-48 bg-white border border-gray-300 shadow rounded z-10">
            {regions.map((region) => (
              <button
                key={region.value}
                className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                onClick={() => handleRegionChange(region.value)}
              >
                {region.label}
              </button>
            ))}
          </div>
        )}
        </div>
        </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded pt-4">   
      {filteredData.map((country: Country) => (
        <Link
          href={`/country/${country.name.common}`}
          key={country.name.common}
          className="block mb-4 bg-white rounded shadow hover:shadow-md"
        >
          <div>
            <img className="rounded-t" src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <div className="m-6">
            <p className="text-gray-900 text-lg font-semibold mt-2">
              {country.name.common}
              </p>
              <div className="my-6 mb-10s text-sm">
                <p>Population: <span className="font-thin">{country.population}</span></p>
                <p>Region: <span className="font-thin">{ country.region}</span></p>
                <p>Capital: <span className="font-thin">{country.capital}</span></p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
