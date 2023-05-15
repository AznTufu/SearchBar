import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [popularCities, setPopularCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [popularFrom, setPopularFrom] = useState([]);

  const fetchPopularCities = async () => {
    try {
      const response = await axios.get(
        'https://api.comparatrip.eu/cities/popular/5'
      );
      setPopularCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchCities = async () => {
    try {
      const response = await axios.get(
        `https://api.comparatrip.eu/cities/autocomplete/?q=${searchInput}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopularClick = () => {
    fetchPopularCities();
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    searchCities();
  };

  const handleCityFrom = (city) => {
    setSelectedCity(city);
    fetchPopularFrom(city);
  };

  const fetchPopularFrom = async (city) => {
    try {
      const response = await axios.get(
        `https://api.comparatrip.eu/cities/popular/from/${city}/5`
      );
      setPopularFrom(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher parmi les villes populaires"
        onClick={handlePopularClick}
      />
      <input
        type="text"
        placeholder="Rechercher une ville"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Rechercher les villes populaires au départ d'une ville"
        onClick={() => handleCityFrom(searchInput)}
      />

      {popularCities.length > 0 && (
        <div>
          <h2>Villes populaires :</h2>
          <ul>
            {popularCities.map((city, i) => (
              <li key={i}>{JSON.stringify(city.local_name)}</li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.length > 0 && (
        <div>
          <h2>Résultats de la recherche :</h2>
          <ul>
            {searchResults.map((result, i) => (
              <li key={i} onClick={() => handleCityFrom(result.local_name)}>
                {JSON.stringify(result.local_name)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCity && popularFrom.length > 0 && (
        <div>
          <h2>Villes populaires au départ de {selectedCity} :</h2>
          <ul>
            {popularFrom.map((city, i) => (
              <li key={i}>{JSON.stringify(city.local_name)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
