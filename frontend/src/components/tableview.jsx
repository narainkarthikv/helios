import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom'; // Import Lin
import './css/tableview.css'

const TableView = () => {
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const filteredBusStations = busStations.filter((station) =>
    station.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBusStations = filteredBusStations.sort((a, b) => {
    if (sortType === 'ID') {
      return a.ID - b.ID;
    } else if (sortType === 'Name') {
      return a.Name.localeCompare(b.Name);
    } else if (sortType === 'Reg') {
      return a.Reg.localeCompare(b.Reg);
    } else if (sortType === 'Year') {
      return a.Year - b.Year;
    } 
    return 0;
  });

  return (
    <div className='TableView'>
      <div className='search-container'>

        <input
          className='search-bar'
          placeholder="Search By Name..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <select className='sort-btn' value={sortType} onChange={handleSort}>
          <option value="ID">ID</option>
          <option value="Name">Name</option>
          <option value="Reg">Region</option>
          <option value="Year">Year</option>
        </select>
      </div>
  
      <table className='tableview-container'>
        <thead>
          <tr>
            <th className='tableview-head'>ID</th>
            <th className='tableview-head'>Name</th>
            <th className='tableview-head'>Location Body</th>
            <th className='tableview-head'>Region</th>
            <th className='tableview-head'>Revenue</th>
            <th className='tableview-head'>Zone Type</th>
            <th className='tableview-head'>Year</th>
            <th className='tableview-head'>Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedBusStations.map((station) => (
            <tr className='tableview-row' key={station.ID}>
              <td className='tableview-row-data'>{station.ID}</td>
              <td className='tableview-row-data'>{station.Name}</td>
              <td className='tableview-row-data'>{station.Local }</td>
              <td className='tableview-row-data'>{station.Reg}</td>
              <td className='tableview-row-data'>{station.Rev}</td>
              <td className='tableview-row-data'>{station.Zone_type}</td>
              <td className='tableview-row-data'>{station.Year}</td>
              {/* <Recordview id={station.ID} /> */}
              <td className='tableview-row-data'>
                {/* Pass ID to Recordview component */}
                <Link className='table-link' to={`/RecordView/${station.ID}`}><FaArrowRight/></Link>
              </td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
