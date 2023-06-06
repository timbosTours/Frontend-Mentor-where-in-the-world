'use client'

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


import { useState, useEffect } from 'react';
  
  export default function Page() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          console.log(data)
        });
    }, []);
  
    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>Could not load Country data</p>;
  
    return (
      <div>
        {data.map((country: Country) => (
        <Link href={`/country/${country.name.common}`} key={country.name.common}>
          <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
          <p>Name: {country.name.common}</p>
          <p>Population: {country.population}</p>
          <p>Capital: {country.capital}</p>
        </Link>
      ))}
      </div>
    );
  }