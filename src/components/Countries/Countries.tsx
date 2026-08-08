import { useEffect, useState, type ReactElement } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import axios from 'axios';

interface Props {

}

interface Country {
    code: string;
    name: string;
}


export default function Countries({ }: Props): ReactElement {

    const [countries, setCountries] = useState<Country[]>([]);
    const getCountries = () => {
        axios.get(API_ENDPOINTS.COUNTRIES_ALL_MOCK, { headers: { 'Authorization': 'Bearer token' } })
            .then((response) => {
                const result = Array.isArray(response.data.countries) ? response.data.countries : [];
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
            {countries?.map(c => <p key={c.code}>{c.name}</p>)}
        </div>
    )
}
