import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import type { Country } from '../../interfaces/countries';
import { Link } from 'react-router';

interface CountriesListProps {

}

export const CountriesList = (props: CountriesListProps) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [countriesPerPage, setCountriesPerPage] = useState<number>(10);

    const getCountries = () => {
        setLoading(true);
        axios.get(API_ENDPOINTS.COUNTRIES_ALL_MOCK, { headers: { 'Authorization': 'Bearer token' } })
            .then((response) => {
                const result = Array.isArray(response.data.countries) ? response.data.countries : [];
                setCountries(result);
            })
            .catch((error) => {
                console.error("Failed to fetch countries", error);
                setCountries([]);
            })
            .finally(() => setLoading(false));
    }

    const filteredCountries = (): Country[] => {
        const startValue = countriesPerPage * (currentPage - 1);
        const endValue = startValue + countriesPerPage;
        return countries.slice(startValue, endValue);
    }

    const paginationItems = () => {

        return Math.ceil(countries.length / countriesPerPage);
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div>
            <ul>
                {filteredCountries().map((c, index) => {
                    const countryName = 'name' in c ? c.name : c.names.common;
                    const countryCode = 'code' in c ? c.code : c.codes.alpha_2;

                    return <li key={index}>
                        <Link to={`/countries/${countryName || countryCode}`}>{countryName}</Link>
                    </li>
                })}
            </ul>
            <br />
            <ul>
                {
                    Array.from({ length: paginationItems() }, (_, i) => <li onClick={() => { setCurrentPage(i + 1) }}>
                        {i + 1}
                    </li>)
                }
            </ul>
        </div>
    )
}
