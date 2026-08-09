interface CountyBase {

}

export interface CountryMock {
    name: string;
    code: string;
    capital: string;
    region: string;
    population: number;
    currency: string;
}

export interface CountryApi {
    names: { common: string };
    codes: { alpha_2: string };
    flag: { emoji: string };
}


export type Country = CountryApi | CountryMock;