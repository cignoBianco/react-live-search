import { useEffect, useState, type ReactElement } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import axios from 'axios';
import type { Country } from '../../interfaces/countries';
import CountryItem from './CountryItem/CountryItem';
import './Countries.css';

interface Props {

}

export default function Countries({ }: Props): ReactElement {
    const [countryInput, setCountryInput] = useState<string>('');
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

    const filteredCountries = (): Country[] => {
        if (!countryInput.trim()) return countries;

        return countries.filter((country) => 'name' in country ? country.name.toLowerCase().includes(countryInput.toLowerCase()) : country.names.common.toLowerCase().includes(countryInput.toLowerCase()))
    }

    return (
        <div>
            <div className='form'>
                <form className='search__form'>
                    <input
                        type="text"
                        name='country'
                        placeholder='Search in the country...'
                        className='search__input'
                        onChange={(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => { setCountryInput(event.target.value); }}
                    />
                    <ul className='autocomplete'>
                        <li className='authocomplete__item'></li>
                        <li className='authocomplete__item'></li>
                        <li className='authocomplete__item'></li>
                        <li className='authocomplete__item'></li>
                        <li className='authocomplete__item'></li>
                    </ul>
                    <span className='search__img'> </span>
                </form>
            </div>
            <div className='countries'>
                {filteredCountries()?.map((c, index) => <CountryItem key={index} country={c} />)}
            </div>

        </div>
    )
}
