import type { CountryApi } from '../../../interfaces/countries'

type CountryItemMainProps = {
    data: CountryApi;
}

export default function CountryItemMain({ data }: CountryItemMainProps) {
    return (
        <div className='country-item'>
            <p key={data.codes.alpha_2}>{data.names.common}</p>
        </div>
    )
}