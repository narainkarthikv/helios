import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/marketview.css';

const MarketView = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const { id } = useParams();
  const [busStation, setBusStation] = useState({});
  const [marketData, setMarketData] = useState(null);
  const [newCropData, setNewCropData] = useState({ Name: '', Price: '', Quantity: '' });

  useEffect(() => {
    fetchBusStation(id);
    fetchMarketData(id);
  }, [id]);

  const fetchBusStation = async (id) => {
    try {
      const response = await axios.get(`${backendURL}/api/bus-stations/${id}`);
      setBusStation(response.data);
    } catch (error) {
      console.error('Error fetching bus station:', error);
    }
  };

  const fetchMarketData = async (id) => {
    try {
      const response = await axios.get(`{backendURL}api/market/${id}`);
      setMarketData(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const crop = {
        Name: newCropData.Name,
        Price: newCropData.Price,
        Quantity: newCropData.Quantity,
    }

    axios.post(`{backendURL}api/market/${id}/crops`, crop)
    .then(res => {
        console.log(res.data);
        setMarketData(res.data);
        setNewCropData({ Name: '', Price: '', Quantity: '' });
    })
    .catch(error => {
        console.error('Error Creating Crop:', error);
    });
};

  const deleteCrop = (cropId) => {
    axios.delete(`{backendURL}api/market/${id}/crops/${cropId}`)
      .then(res => {
        console.log(res.data);
        fetchMarketData(id);
      })
      .catch(error => {
        console.error('Error deleting Crop:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setNewCropData({ ...newCropData, [name]: value });
  };

  return (
    <div className='MarketView'>
        <div>
          <h2>Market Information for ID: {busStation.ID}</h2>
          <h3>Market Name: {busStation.Name}</h3>
          <div className='crops-info'>
            <h3>Crops Information</h3>
            <ul>
              {marketData && marketData.Crops && marketData.Crops.length > 0 ? (
                marketData.Crops.map((crop, index) => (
                  <div key={index}>
                    <li>{crop.Name}: {crop.Quantity} Price: {crop.Price}</li>
                    <button onClick={() => deleteCrop(crop._id)}>Delete</button>
                  </div>
                ))
              ) : (
                <div>No crops available for this market.</div>
              )}
            </ul>
            <h3>Add New Crop:</h3>
            <form onSubmit={onSubmit}>
                <input name="Name" value={newCropData.Name} onChange={handleChange} placeholder="Crop Name" />
                <input  name="Quantity" value={newCropData.Quantity} onChange={handleChange} placeholder="Quantity" />
                <input name="Price" value={newCropData.Price} onChange={handleChange} placeholder="Price" />
                <button onSubmit={onSubmit}>Add Crop</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default MarketView;