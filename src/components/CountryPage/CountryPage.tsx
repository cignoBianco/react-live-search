import { useParams } from 'react-router';
import axios from 'axios';
import { API_ENDPOINTS } from '../../constants/api';
import { useState, useEffect } from 'react';
import type { CountryMock } from '../../interfaces/countries';


interface CountryPageProps {
}

export const CountryPage = () => {
    const { countryName } = useParams<{ countryName: string }>();

    const [country, setCountry] = useState<CountryMock | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(API_ENDPOINTS.COUNTRIES_ALL_MOCK, { headers: { 'Authorization': 'Bearer token' } })
            .then((response) => {
                const result = Array.isArray(response.data.countries) ? response.data.countries : [];
                const foundCountry = result.find(r => r.name === countryName || r.code === countryName);
                if (foundCountry) {
                    setCountry(foundCountry);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch the country", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [countryName]);

    if (loading) {
        return <div>Загрузка данных о стране...</div>;
    }

    if (!country) {
        return <div>Страна "{countryName}" не найдена.</div>;
    }

    return (
        <div>
            {country.name}<br />
            {country.code}<br />
            {country.capital}<br />
            {country.currency}<br />
            {country.population}
        </div>
    )
}
