import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight, FaSort } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const DataView = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [busStations, setBusStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    fetchBusStations();
  }, []);

  const fetchBusStations = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/bus-stations`);
      setBusStations(response.data);
    } catch (error) {
      console.error('Error fetching bus stations:', error);
    }
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSort = (event) => setSortType(event.target.value);

  const filteredBusStations = busStations.filter(station => (
    station.Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    station.Reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.Zone_type.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const sortedBusStations = filteredBusStations.sort((a, b) => {
    switch (sortType) {
      case 'ID': return a.ID - b.ID;
      case 'Name': return a.Name.localeCompare(b.Name);
      case 'Reg': return a.Reg.localeCompare(b.Reg);
      case 'Revenue': return a.Rev - b.Rev;
      case 'Year': return a.Year - b.Year;
      case 'Zone_type': return a.Zone_type.localeCompare(b.Zone_type);
      default: return 0;
    }
  });

  return (
    <div className='p-4'>
      <div className='flex items-center mb-4'>
        <input
          className='flex-grow p-2 border border-gray-300 rounded'
          placeholder="🔍 Search By Name, Region, Zone Type"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className='ml-2 p-2 border border-gray-300 rounded' value={sortType} onChange={handleSort}>
          <option value="ID">ID</option>
          <option value="Name">Name</option>
          <option value="Reg">Region</option>
          <option value="Revenue">Revenue</option>
          <option value="Year">Year</option>
          <option value="Zone_type">Zones</option>
        </select>
        <h3 className='ml-2'><FaSort className='text-xl'/></h3>
      </div>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Location Body</th>
            <th className='border p-2'>Region</th>
            <th className='border p-2'>Revenue</th>
            <th className='border p-2'>Zone Type</th>
            <th className='border p-2'>Year</th>
            <th className='border p-2'>More Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedBusStations.map((station) => (
            <tr className='border' key={station.ID}>
              <td className='border p-2'>{station.ID}</td>
              <td className='border p-2'>{station.Name}</td>
              <td className='border p-2'>{station.Local}</td>
              <td className='border p-2'>{station.Reg}</td>
              <td className='border p-2'>{station.Rev}</td>
              <td className='border p-2'>{station.Zone_type}</td>
              <td className='border p-2'>{station.Year}</td>
              <td className='border p-2'>
                <Link className='text-blue-500' to={`/RecordView/${station.ID}`}>
                  <FaArrowRight className='text-xl'/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataView;
