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
    population: number;
    capital: string;
    currencies: {
        [code: string]: {
        name: string;
        };
    };
    languages: {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }[];
    borders: string[];
    tld: string[];
    region: string;
    subregion: string;
    cca3: string;
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
        fetch(`https://restcountries.com/v3.1/name/${params.id}`)
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
    if (isLoading) return <p>Loading...</p>;

    // Render error state if country data couldn't be loaded
    if (!country) return <p>Could not load Country data</p>;

    return (
        <div className="p-6 dark:bg-gray-900 h-screen">
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
                <img className="md:w-1/2 md:h-90" src={country.flags.svg} alt={`${country.name.common} Flag`} />
                
        <div className="md:py-8 lg:py-14 xl:py-20 md:w-1/2 lg:ml-16">
        <h2 tabIndex={0} className="text-xl font-semibold text-gray-900 my-6 dark:text-white lg:text-2xl">
        {country.name.common}
        </h2>
        <div className="md:flex">
        <div className="mr-4 md:mr-6 lg:mr-14 xl:mr-24">
        {country.name.nativeName && (
        <p tabIndex={0} className="my-2 text-sm ">
            Native Name: <span className="font-thin">{country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</span>
        </p>
        )}
        <p tabIndex={0} className="my-2 text-sm">Population: <span className="font-thin">{country.population}</span></p>
        <p tabIndex={0} className="my-2 text-sm">Region: <span className="font-thin">{country.region}</span></p>
        <p tabIndex={0} className="my-2 text-sm">Subregion: <span className="font-thin">{country.subregion}</span></p>
        <p tabIndex={0} className="my-2 text-sm">Capital: <span className="font-thin">{country.capital}</span></p>
        </div>
        <br />
        <div>
        <p tabIndex={0} className="my-2 text-sm">Top Level Domain: <span className="font-thin">{country.tld.join(", ")}</span></p>
        <p tabIndex={0} className="my-2 text-sm">
        Currencies:<span className="font-thin">{" "}
        {Object.values(country.currencies).map((currency) => currency.name).join(", ")}
        </span></p>
        <p tabIndex={0} className="my-2 text-sm">Languages: <span className="font-thin">{Object.values(country.languages).join(", ")}</span></p>
        </div>
        </div>
        <br />
        <div className="md:flex md:flex-wrap md:justify-start ">
        {/* Render border countries if available */}
        {borderCountries.length > 0 && (
            <div className="mt-2 text-sm">
            <p tabIndex={0} className="md:inline mb-4">Border Countries:</p>
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
