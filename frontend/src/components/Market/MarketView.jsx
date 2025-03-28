import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa';
import Crop from './Crop';

const MarketView = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const { id } = useParams();
  const [busStation, setBusStation] = useState({});
  const [marketData, setMarketData] = useState(null);
  const [newCropData, setNewCropData] = useState({ Name: '', Price: '', Quantity: '' });
  const [cropQuantities, setCropQuantities] = useState({}); 
  const [showRefillForm, setShowRefillForm] = useState(false);

  useEffect(() => {
    const isRefillRequired = Object.values(cropQuantities).some(quantity => quantity <= 25);
    setShowRefillForm(isRefillRequired);
  }, [cropQuantities]);

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
      const response = await axios.get(`http://localhost:4000/api/market/${id}`);
      setMarketData(response.data);
      if (response.data && response.data.Crops) {
        const quantities = {};
        response.data.Crops.forEach(crop => {
          quantities[crop._id] = crop.Quantity;
        });
        setCropQuantities(quantities);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const updateCropQuantity = async (cropId, newQuantity) => {
    try {
      await axios.put(`http://localhost:4000/api/market/${id}/crops/${cropId}`, { Quantity: newQuantity });
      fetchMarketData(id);
    } catch (error) {
      console.error('Error updating crop quantity:', error);
    }
  };
  
  const incrementQuantity = (cropId) => {
    const updatedQuantity = parseInt(cropQuantities[cropId]) + 1;
    setCropQuantities(prevState => ({
      ...prevState,
      [cropId]: updatedQuantity
    }));
    updateCropQuantity(cropId, updatedQuantity);
  };

  const decrementQuantity = (cropId) => {
    if (parseInt(cropQuantities[cropId]) > 0) {
      const updatedQuantity = parseInt(cropQuantities[cropId]) - 1;
      setCropQuantities(prevState => ({
        ...prevState,
        [cropId]: updatedQuantity
      }));
      updateCropQuantity(cropId, updatedQuantity);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const isCropExists = marketData.Crops.some(crop => crop.Name.toLocaleLowerCase() === newCropData.Name.toLocaleLowerCase());
  
    if (isCropExists) {
      alert('Crop with this name already exists!');
      return;
    }
  
    const crop = {
      Name: newCropData.Name,
      Price: newCropData.Price,
      Quantity: parseInt(newCropData.Quantity)
    };
  
    axios.post(`http://localhost:4000/api/market/${id}/crops`, crop)
      .then(res => {
        const newCropId = res.data.Crops.find(c => c.Name === newCropData.Name)._id; // Find the ID of the newly added crop
        setMarketData(res.data);
        setCropQuantities(prevState => ({
          ...prevState,
          [newCropId]: parseInt(newCropData.Quantity)
        }));
        setNewCropData({ Name: '', Price: '', Quantity: '' });
      })
      .catch(error => {
        console.error('Error Creating Crop:', error);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCropData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const deleteCrop = (cropId) => {
    axios.delete(`http://localhost:4000/api/market/${id}/crops/${cropId}`)
      .then(res => {
        console.log(res.data);
        fetchMarketData(id);
      })
      .catch(error => {
        console.error('Error deleting Crop:', error);
      });
  };
  const date = new Date();

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Market Information for ID: {busStation.ID}</h2>
        <h2 className='text-xl'>Market Name: {busStation.Name}</h2>
        <h2 className='text-lg text-gray-600'>Date: {date.getDate()} / {date.getMonth()} / {date.getFullYear()}</h2>
      </div>
      {showRefillForm && (
      <div>
        <form className='flex flex-col items-center' action="https://formsubmit.co/narainkarthik812@gmail.com" method="POST">
          <input id="warning" name="warning" onChange={handleChange} placeholder='Type the Message to be sent' className='border border-gray-300 rounded-lg p-2 mb-2 w-full max-w-md' autoComplete='true' required />
          <button type="submit" className='bg-blue-500 text-white rounded-lg p-2'><FaArrowRight /></button>
        </form>
      </div>
      )}
      <div className='mb-4'>
        <h3 className='text-xl font-semibold'>Add New Crop:</h3>
        <form onSubmit={onSubmit} className='flex flex-col items-center'>
          <input id="Name" className='border border-gray-300 rounded-lg p-2 mb-2 w-full max-w-md' name="Name" value={newCropData.Name} onChange={handleChange} placeholder="Crop Name" autoComplete='true' />
          <input id="Quantity" className='border border-gray-300 rounded-lg p-2 mb-2 w-full max-w-md' name="Quantity" value={newCropData.Quantity} onChange={handleChange} placeholder="Quantity" autoComplete='true' />
          <input id="Price" className='border border-gray-300 rounded-lg p-2 mb-2 w-full max-w-md' name="Price" value={newCropData.Price} onChange={handleChange} placeholder="Price" autoComplete='true' />
          <button className='bg-green-500 text-white rounded-lg p-2' type="submit"> <FaPlusCircle /> </button>
        </form>
      </div>
     
      <h3 className='text-xl font-semibold mb-4'>Crops Information</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {marketData && marketData.Crops && marketData.Crops.length > 0 ? (
          marketData.Crops.map((crop, index) => (
            <Crop
              key={index}
              crop={crop}
              quantity={cropQuantities[crop._id]}
              incrementQuantity={() => incrementQuantity(crop._id)}
              decrementQuantity={() => decrementQuantity(crop._id)}
              deleteCrop={() => deleteCrop(crop._id)}
            />
          ))
        ) : (
          <div className='col-span-full text-center'>No crops available for this market.</div>
        )}
      </div>
    </div>
  );
};

export default MarketView;
