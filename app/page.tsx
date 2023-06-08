'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Country {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  population: number;
  capital: string;
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
    <div>
      <div>
        <input
          type="text"
          placeholder="Search country"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div ref={dropdownRef} className="dropdown">
          <button className="dropdown-button" onClick={handleButtonClick}>
            Filter by Region
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {regions.map((region) => (
                <button
                  key={region.value}
                  className="dropdown-menu-item"
                  onClick={() => handleRegionChange(region.value)}
                >
                  {region.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredData.map((country: Country) => (
        <Link href={`/country/${country.name.common}`} key={country.name.common}>
          <div>
            <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <p>Name: {country.name.common}</p>
            <p>Population: {country.population}</p>
            <p>Capital: {country.capital}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
