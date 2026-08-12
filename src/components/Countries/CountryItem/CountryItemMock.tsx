import type { CountryMock } from '../../../interfaces/countries'
import './CountryItem.css';

type CountryItemMockProps = {
    data: CountryMock;
}

export default function CountryItemMock({ data }: CountryItemMockProps) {
    return (
        <div className='country-item'>
            <p className='country-item__name' key={data.code}>{data.name}</p>
            <div className='country-item__data'>
                <div className='country-item__data-pair'>
                    <p className='data-pair__title'>Capital</p>
                    <p className='data-pair__value'>{data.capital}</p>
                </div>
                <div className='country-item__data-pair'>
                    <p className='data-pair__title'>Population</p>
                    <p className='data-pair__value'>{data.population}</p>
                </div>
                <div className='country-item__data-pair'>
                    <p className='data-pair__title'>Currency</p>
                    <p className='data-pair__value'>{data.currency}</p>
                </div>
            </div>
            <button className='country-item__button'>Explore</button>
        </div>
    )
}