import type { CountryMock } from '../../../interfaces/countries'
import './CountryItem.css';

type CountryItemMockProps = {
    data: CountryMock;
}

export default function CountryItemMock({ data }: CountryItemMockProps) {
    return (
        <div className='country-item'>
            <p key={data.code}>{data.name}</p>
        </div>
    )
}