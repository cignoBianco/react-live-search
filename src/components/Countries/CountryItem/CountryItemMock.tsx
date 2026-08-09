import type { CountryMock } from '../../../interfaces/countries'

type CountryItemMockProps = {
    data: CountryMock;
}

export default function CountryItemMock({ data }: CountryItemMockProps) {
    return (
        <div>
            <p key={data.code}>{data.name}</p>
        </div>
    )
}