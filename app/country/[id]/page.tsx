'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Country {
    flags: {
        svg: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
        [key: string]: {
            official: string;
            common: string;
        };
        };
    };
    population?: number;
    capital?: string;
    currencies?: {
        [code: string]: {
        name: string;
        };
    };
    languages?: {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }[];
    borders?: string[];
    tld?: string[];
    region?: string;
    subregion?: string;
    cca3?: string;
}

export default function Country({ params }: { params: { id: string } }) {
    // State variables
    const [country, setCountry] = useState<Country | null>(null);
    const [borderCountries, setBorderCountries] = useState<Country[]>([]);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    // Fetch country data when the component mounts or when the ID parameter changes
    useEffect(() => {
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${params.id}?fullText=true`)
        .then((res) => res.json())
        .then((data) => {
            setCountry(data[0] || null);
            setLoading(false);
        });
    }, [params.id]);

    // Fetch border countries data
    useEffect(() => {
        if (country && country.borders && country.borders.length > 0) {
        const borderCodes = country.borders.join(',');
        fetch(`https://restcountries.com/v3.1/alpha?codes=${encodeURIComponent(borderCodes)}`)
            .then((res) => res.json())
            .then((data) => {
            setBorderCountries(data);
            });
        }
    }, [country]);

    // Render loading state
    if (isLoading) return <div className="h-screen dark:bg-gray-900"><svg className="h-10 w-10 mx-auto my-10 dark:fill-white animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208.6 357.3l-39-13.5c-6.5-2.2-13.6-2.3-20.1-.3l-15.3 4.9c-18.5 5.9-38.5-2.4-47.5-19.5l-3.3-6.2c-10.6-20.1-2.3-45 18.2-54.7l35.3-16.8c2.3-1.1 4.4-2.8 5.9-4.8l5.3-7c7.2-9.6 18.6-15.3 30.6-15.3s23.4 5.7 30.6 15.3l4.6 6.1c2 2.6 4.9 4.5 8.1 5.1c7.8 1.6 15.7-1.5 20.4-7.9l10.4-14.2c2-2.8 5.3-4.4 8.7-4.4c4.4 0 8.4 2.7 10 6.8l10.1 25.9c2.8 7.2 6.7 14 11.5 20.2L311 299.8c5.8 7.4 9 16.6 9 26s-3.2 18.6-9 26L299 367.2c-8.3 10.6-21 16.8-34.4 16.8c-8.4 0-16.6-2.4-23.7-7l-25.4-16.4c-2.2-1.4-4.5-2.5-6.9-3.4zm65.2-214.8L296 164.7c10.1 10.1 2.9 27.3-11.3 27.3H254.8c-5.6 0-11.1-1.2-16.2-3.4l-42.8-19c-14.3-6.3-11.9-27.3 3.4-30.3l38.5-7.7c13.1-2.6 26.7 1.5 36.1 10.9zM248 432c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16s-7.2 16-16 16H264c-8.8 0-16-7.2-16-16zM431.2 298.9l8 24c2.8 8.4-1.7 17.4-10.1 20.2s-17.4-1.7-20.2-10.1l-8-24c-2.8-8.4 1.7-17.4 10.1-20.2s17.4 1.7 20.2 10.1zm-19.9 80.4l-32 32c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l32-32c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></div>;

    // Render error state if country data couldn't be loaded
    if (!country) return <p>Could not load Country data</p>;

    return (
        <div className="p-6 dark:bg-gray-900 dark:h-screen">
  {/* Button to go back */}
    <button
        onClick={() => {
        router.back();
        }}
        className="py-1.5 px-6 pl-2 my-4 mb-12 bg-white text-gray-900 rounded shadow-3xl flex text-sm font-thin dark:bg-gray-800 dark:text-white"
    ><svg className="h-4 mt-0.5 mx-2 mr-4 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
        Back
    </button>
    <div className="md:flex md:grid-cols-2 md:gap-10 align-middle dark:text-white">
        {/* Country information */}
                <img className="md:w-1/2 h-auto" src={country.flags.svg} alt={`${country.name.common} Flag`} />
                
        <div className="md:py-8 lg:py-14 xl:py-20 md:w-1/2 lg:ml-16">
        <h2 tabIndex={0} className="text-xl font-semibold text-gray-900 my-6 dark:text-white lg:text-2xl">
        {country.name.common}
        </h2>
        <div className="md:flex">
  <div className="mr-4 md:mr-6 lg:mr-14 xl:mr-24">
    {country.name && country.name.nativeName && Object.keys(country.name.nativeName).length > 0 && (
      <p tabIndex={0} className="my-2 text-sm">
        Native Name: <span className="font-thin">{country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</span>
      </p>
    )}
    {country.population && (
      <p tabIndex={0} className="my-2 text-sm">Population: <span className="font-thin">{country.population}</span></p>
    )}
    {country.region && (
      <p tabIndex={0} className="my-2 text-sm">Region: <span className="font-thin">{country.region}</span></p>
    )}
    {country.subregion && (
      <p tabIndex={0} className="my-2 text-sm">Subregion: <span className="font-thin">{country.subregion}</span></p>
    )}
    {country.capital && (
      <p tabIndex={0} className="my-2 text-sm">Capital: <span className="font-thin">{country.capital}</span></p>
    )}
  </div>
  <div>
    {country.tld && country.tld.length > 0 && (
      <p tabIndex={0} className="my-2 text-sm">
        Top Level Domain: <span className="font-thin">{country.tld.join(", ")}</span>
      </p>
    )}
    {country.currencies && Object.values(country.currencies).some(currency => currency.name) && (
      <p tabIndex={0} className="my-2 text-sm">
        Currencies:<span className="font-thin">{" "}
          {Object.values(country.currencies).map((currency) => currency.name).join(", ")}
        </span>
      </p>
    )}
    {country.languages && Object.values(country.languages).length > 0 && (
      <p tabIndex={0} className="my-2 text-sm">Languages: <span className="font-thin">{Object.values(country.languages).join(", ")}</span></p>
    )}
  </div>
</div>

        <br />
        <div className="md:flex md:flex-wrap md:justify-start ">
        {/* Render border countries if available */}
        {borderCountries.length > 0 && (
            <div className="mt-2 text-sm">
            <p tabIndex={0} className="md:inline mb-4 mr-2">Border Countries:</p>
            <div className="grid md:inline-flex grid-cols-3 sm:grid-cols-4 sm:flex-wrap">
                {borderCountries.map((borderCountry) => (
                <Link
                    href={`/country/${borderCountry.name.common}`}
                    key={borderCountry.cca3}
                    className="py-1 px-4 bg-white text-sm font-thin rounded shadow mt-2 mr-2 h-8 overflow-hidden hover:overflow-scroll dark:bg-gray-800"
                >
                    {borderCountry.name.common}
                </Link>
                ))}
            </div>
            </div>
        )}
</div>
        </div>
    </div>
</div>

    );
}
