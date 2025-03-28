import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './css/Market.css';

const Market = () => {
  
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [marketPlaces, setMarketPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarketPlaces();
  }, []);

  const fetchMarketPlaces = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/bus-stations`);
      const placesWithMarket = response.data;
      const filteredPlaces = placesWithMarket.filter(place => place.MarketInfrastructure);
      console.log(filteredPlaces);
      setMarketPlaces(placesWithMarket);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market places:', error);
      setError('Error fetching market places. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className='Market'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h2>Places with Market Infrastructure</h2>
          <ul className='market-list'>
            {marketPlaces.map(place => (
              <li key={place.ID}>
                <Link to={`/MarketView/${place.ID}`} className='place-link'>
                  {place.Name}
                  <FaArrowRight className='arrow-icon' />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Market;
