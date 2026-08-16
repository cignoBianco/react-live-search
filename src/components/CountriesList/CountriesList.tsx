import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import type { Country } from '../../interfaces/countries';
import { Link } from 'react-router';
import Pagination from './Pagination/index';
import Dropdown from 'react-bootstrap/Dropdown';

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

    if (loading) return 'loading...';

    if (!countries.length) return 'no data =(';

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h1 className='text-primary'>Countries</h1>
                <Dropdown>
                    <Dropdown.Toggle className='m-2' size="sm" variant="secondary" id="dropdown-basic">
                        {countriesPerPage} elements per page
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setCountriesPerPage(10)} href="#/action-1">10</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCountriesPerPage(20)} href="#/action-2">20</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCountriesPerPage(50)} href="#/action-3">50</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <ul className='list-group mb-2'>
                {filteredCountries().map((c, index) => {
                    const countryName = 'name' in c ? c.name : c.names.common;
                    const countryCode = 'code' in c ? c.code : c.codes.alpha_2;

                    return <li key={index} className='list-group-item'>
                        <Link to={`/countries/${countryName || countryCode}`}>{countryName}</Link>
                    </li>
                })}
            </ul>
            <Pagination paginationLength={paginationItems()} clickHandler={(pageNumber: number) => setCurrentPage(pageNumber)} />
            <div className='d-flex justify-content-center gap-2 mt-2'>
                <button className='btn btn-primary' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous page</button>
                <button className='btn btn-primary' disabled={currentPage === paginationItems()} onClick={() => setCurrentPage(currentPage + 1)}>Next page</button>
            </div>
        </div>
    )
}
