import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';

const Market = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [marketPlaces, setMarketPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    fetchMarketPlaces();
  }, []);

  const fetchMarketPlaces = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/bus-stations`);
      const placesWithMarket = response.data;
      const filteredMarkets = placesWithMarket.filter(place => place.MarketInfrastructure === 'true');
      setMarketPlaces(filteredMarkets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market places:', error);
      setError('Error fetching market places. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const filterPlaces = () => {
      if (searchQuery === '') {
        setFilteredPlaces(marketPlaces);
      } else {
        const filtered = marketPlaces.filter(place => (
          place.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.Reg.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        setFilteredPlaces(filtered);
      }
    };
    filterPlaces();
  }, [searchQuery, marketPlaces]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='Market'>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          <div className='flex justify-center mb-4'>
              <input 
                type="text" 
                placeholder="🔍 Search by Name or Region" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                className="border border-gray-300 rounded-lg p-2 w-full max-w-md" 
              />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredPlaces.length === 0 ? (
                <h3 className='text-center col-span-full'>No matching places found.</h3>
              ) : (
                filteredPlaces.map(place => (
                  <div className='border p-4 rounded-lg shadow-md' key={place.ID}>
                    <h3 className='text-lg font-semibold'>{place.Name}</h3>
                    <h3 className='text-gray-600'>{place.Reg}</h3>
                    <Link className='text-blue-500 hover:underline' to={`/MarketView/${place.ID}`}>
                      <FaArrowRight className='inline-block ml-2' />
                    </Link>
                  </div>
                ))
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
