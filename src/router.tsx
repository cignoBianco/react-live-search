import { createBrowserRouter, RouterProvider } from 'react-router';
import Countries from './components/Countries/Countries';
import CountryPage from './components/CountryPage';
import CountriesList from './components/CountriesList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Countries />,
  },
  {
    path: '/countries-list',
    element: <CountriesList />,
  },
  {
    path: '/countries/:countryName',
    element: <CountryPage />,
  },
]);
