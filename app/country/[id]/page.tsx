'use client'

import Link from 'next/link';

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
            }
        }
    }
    population: number;
    capital: string;
    currencies: {
            [code: string]: {
                name: string;
            };
        };
        languages: {
            [code: string]: string;
        };
        borders: string[];
    tld: string[];
    region: string;
    subregion: string;
    }


import { useState, useEffect } from 'react';

export default function Country({ params }: {
        params: { id: string };
    }) {
    const [data, setData] = useState<Country[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
            console.log(data);
        });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>Could not load Country data</p>;

    return (
        <div>
        {data.map((country: Country) => (
            <div key={country.name.common}>
            <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <h2>{country.name.common}</h2>
            <p>Native Name: {Object.entries(country.name.nativeName).map(([language, nativeName]) => (<span key={language}>{nativeName.official}</span>
                ))}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
            <br />
            <p>Top Level Domain: {country.tld.join(', ')}</p>
            <p>Currencies: {Object.values(country.currencies).map((currency) => currency.name).join(', ')}</p>
                <p>Languages: {Object.values(country.languages).join(', ')}</p>
            <br />
            {country.borders && country.borders.length > 0 && (
            <p>
                Border Countries:{" "}
                <span>
                {country.borders.map((border) => (
                    <Link href={`/country/${border}`} key={border}>
                    {border}
                    </Link>
                ))}
                </span>
            </p>
            )}

            </div>
        ))}
        </div>
    );
    }
