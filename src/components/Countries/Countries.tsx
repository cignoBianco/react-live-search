import { useEffect, useState, type ReactElement } from 'react'
import { API_ENDPOINTS } from '../../constants/api';
import axios from 'axios';

interface Props {

}

export default function Countries({ }: Props): ReactElement {

    const [countries, setCountries] = useState([]);
    const getCountries = () => {
        axios.get(API_ENDPOINTS.COUNTRIES_ALL)
            .then((response) => {
                setCountries(response.data)
            })
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div>
            {countries.map(c => <p key={c}>{c}</p>)}
        </div>
    )
}
