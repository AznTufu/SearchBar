import { useState } from 'react';
import axios from 'axios';

const App = () => {
  // Déclaration d'états et de fonctions de mise à jour d'états
  const [searchInput, setSearchInput] = useState('');
  const [popularCities, setPopularCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [popularFrom, setPopularFrom] = useState([]);

  // Déclaration de fonctions
  // Fonctions asynchrone qui récupère des données avec axios en effectuant une requête GET vers l'url spécifiée et update l'état correspondant dans la fonction de mise à jour d'état
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

  // Fonctions de gestion d'événements
  const handlePopularClick = () => {
    fetchPopularCities();
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    searchCities();
  };

  const handleCityFrom = async (city) => {
    await fetchPopularFrom(city);
  };

  // Fonction asynchrone qui récupère des données avec axios en effectuant une requête GET vers l'url spécifiée et update l'état correspondant dans la fonction de mise à jour d'état
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

  // La fonction handleInputBlur est appelée lorsque l'utilisateur quitte l'un des inputs. Rénitialise les états correspondants
  const handleInputBlur = () => {
    setPopularCities([]);
    setSearchResults([]);
    setPopularFrom([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher parmi les villes populaires"
        onClick={handlePopularClick}
        onBlur={handleInputBlur}
      />
      <input
        type="text"
        placeholder="Rechercher une ville"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <input
        type="text"
        placeholder="Rechercher les villes populaires au départ d'une ville"
        onClick={() => handleCityFrom(searchInput)}
        onBlur={handleInputBlur}
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

      {popularFrom.length > 0 && (
        <div>
          <h2>Villes populaires au départ de {searchInput} :</h2>
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
