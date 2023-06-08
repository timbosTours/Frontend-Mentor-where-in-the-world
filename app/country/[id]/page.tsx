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
    const [country, setCountry] = useState<Country | null>(null);
    const [borderCountries, setBorderCountries] = useState<Country[]>([]);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            setCountry(data[0] || null);
            setLoading(false);
        });
    }, [params.id]);

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

    if (isLoading) return <p>Loading...</p>;
    if (!country) return <p>Could not load Country data</p>;

    return (
        <div>
        <button onClick={() => {router.back()}}>Back</button>
        <div>
            <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <h2>{country.name.common}</h2>
            {country.name.nativeName && (
            <p>Native Name: {country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</p>
            )}
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
            <br />
            <p>Top Level Domain: {country.tld.join(', ')}</p>
            <p>Currencies: {Object.values(country.currencies).map((currency) => currency.name).join(', ')}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
            <br />
            {borderCountries.length > 0 && (
            <p>
                Border Countries:{' '}
                <span>
                {borderCountries.map((borderCountry) => (
                    <Link href={`/country/${borderCountry.name.common}`} key={borderCountry.cca3}>
                    {borderCountry.name.common}
                    </Link>
                ))}
                </span>
            </p>
            )}
        </div>
        </div>
    );
}
