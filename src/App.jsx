import { useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

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
    <div className="w-[100vw] h-[100vh] bg-[#F1F2F6] p-4">
      <section className="flex flex-col items-start min-w-[150px] bg-white mt-[260px] rounded-[8px]">
        {/* Menu section */}
        <div className="flex flex-col gap-1 p-5 pb-0 w-full">
          <div className="flex justify-start gap-[22px] mb-1">
            <div className="flex items-center gap-[10px]">
              <h3 className="text-[#132968] text-[14px]">One-way</h3>
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" width="24" height="24" />
            </div>
            <div className="flex items-center gap-[10px]">
              <h3 className="text-[#132968] text-[14px]">1 adult, No discount card</h3>
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" width="24" height="24" />
            </div>
          </div>
        {/* End Menu section */}
        {/* Search section */}
          <div className="flex flex-col gap-1 relative">
            <div className="flex items-center bg-[#F1F2F6] h-12 min-w-[150px] w-full gap-[10px] pl-2 rounded-[8px] hover:border-[1px] hover:border-[#a1a9c3] hover:border-solid">
              <Icon icon="material-symbols:adjust-outline" width="24" height="24" color="#A1A9C3"/>
              <input
                type="text"
                placeholder="From: City, Station Or Airport"
                className="w-full bg-[#F1F2F6] outline-none"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="w-full absolute top-12 bg-white rounded-[8px] shadow-lg z-10">
              {searchResults.length > 0 && (
                <div>
                  <h2 className="flex items-center h-10 px-5">Résultats de la recherche :</h2>
                  <ul>
                    {searchResults.map((result, i) => (
                      <li key={i} 
                      onClick={() => handleCityFrom(result.local_name)} 
                      className="flex items-center hover:bg-[#F1F2F6] px-5 h-12 gap-[10px] text-[#132968]">
                        <Icon icon="material-symbols:location-on-rounded" width="24" height="24"/>
                        {result.local_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        {/* End Search section */}
        {/* Popular section */}
          <div className="flex flex-col gap-1 relative">
            <div className="flex items-center bg-[#F1F2F6] h-12 min-w-[150px] gap-[10px] pl-2 rounded-[8px] hover:border-[1px] hover:border-[#a1a9c3] hover:border-solid">
              <Icon icon="material-symbols:location-on-rounded" width="24" height="24" color="#A1A9C3"/>
              <input
                type="text"
                placeholder="To: City, Station Or Airport"
                className="w-full bg-[#F1F2F6] outline-none"
                onClick={() => handleCityFrom(searchInput)}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="w-full absolute top-12 bg-white rounded-[8px] shadow-lg z-10">
              {popularFrom.length > 0 && (
                <div>
                  <h2 className="flex items-center h-10 px-5">Villes populaires au départ de {searchInput} :</h2>
                  <ul>
                    {popularFrom.map((city, i) => (
                      <li key={i} className="flex items-center hover:bg-[#F1F2F6] px-5 h-12 gap-[10px] text-[#132968]">
                        <Icon icon="material-symbols:location-on-rounded" width="24" height="24"/>
                        {city.local_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        {/* End Popular section */}
        {/* Popular cities section */}
          <div className="flex flex-col gap-1 relative">
            <div className="flex items-center bg-[#F1F2F6] h-12 min-w-[150px] gap-[10px] pl-2 rounded-[8px] hover:border-[1px] hover:border-[#a1a9c3] hover:border-solid">
              <Icon icon="mdi:bat" width="24" height="24" color="#A1A9C3"/>
              <input
                type="text"
                placeholder="Afficher les villes populaires"
                className="w-full bg-[#F1F2F6] outline-none"
                onClick={handlePopularClick}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="w-full absolute top-12 bg-white rounded-[8px] shadow-lg z-10">
              {popularCities.length > 0 && (
                <ul>
                  {popularCities.map((city, i) => (
                    <li key={i} className="flex items-center hover:bg-[#F1F2F6] px-5 h-12 text-[#132968]">{city.local_name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        {/* End Popular cities section */}
        {/* Search section */}
          <div className="flex justify-center items-center bg-[#FA6B6B] h-12 min-w-[150px] gap-[10px] pl-2 rounded-[8px] hover:opacity-[80%] transition duration-200 ease-linear">
            <span className="text-[15px] text-white">Search</span>
          </div>
        </div>
        {/* End Search section */}
        {/* Accommodation section */}
        <div className="flex p-4 gap-2">
          <div className="flex items-center w-9 h-5 bg-[#5E90CC] rounded-[30px] p-1"> <div className="bg-white rounded-full w-4 h-4"/> </div>
          <div>Find my accommodation</div>
        </div>
        {/* End Accommodation section */}
      </section>
    </div>
  );
};

export default App;
