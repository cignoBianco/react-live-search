import type { Country, CountryApi, CountryMock } from "../../../interfaces/countries";
import CountryItemMain from "./CountryItemMain";
import CountryItemMock from "./CountryItemMock";

interface CountryItemProps {
    country: Country;
}

const isMockFormat = (country: Country): country is CountryMock => {
    return 'code' in country;
}

const CountryItem = ({ country }: CountryItemProps) => {
    if (isMockFormat(country)) {
        return <CountryItemMock data={country} />
    }

    return <CountryItemMain data={country} />
}

export default CountryItem