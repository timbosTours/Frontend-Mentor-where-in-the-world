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

const regions = [
  { label: 'Africa', value: 'africa' },
  { label: 'America', value: 'americas' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Oceania', value: 'oceania' },
];

export default function Page() {
  const [data, setData] = useState<Country[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setDropdownOpen(false);
  };

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

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
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
