import { useEffect, useState, type ReactElement } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import axios from 'axios';
import type { Country } from '../../interfaces/countries';
import CountryItem from './CountryItem/CountryItem';

interface Props {

}

export default function Countries({ }: Props): ReactElement {

    const [countries, setCountries] = useState<Country[]>([]);
    const getCountries = () => {
        axios.get(API_ENDPOINTS.COUNTRIES_ALL_MOCK, { headers: { 'Authorization': 'Bearer token' } })
            .then((response) => {
                const result = Array.isArray(response.data.countries) ? response.data.countries : [];
                // "meta": { "total": 249, "count": 3, "limit": 3, "offset": 0, "more": true }
                setCountries(result);
            })
            .catch((error) => {
                console.error("Failed to fetch countries", error);
                setCountries([]);
            });
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div>
            <div className='form'>
                <form className='search__form'>
                    <input
                        type="text"
                        placeholder='Search in the country...'
                        className='search__input'
                    />
                    <img src="img" alt="img" className='search__img' />
                </form>
            </div>
            <div className='countries'>
                {countries?.map(c => <CountryItem country={c} />)}
            </div>

        </div>
    )
}
