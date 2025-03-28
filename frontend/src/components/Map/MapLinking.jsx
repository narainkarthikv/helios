import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Icon } from "leaflet";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';

import commercialPlaceholder from '../../assets/images/commercial-placeholder.png';
import governmentPlaceholder from '../../assets/images/government-placeholder.png';
import parkPlaceholder from '../../assets/images/park-placeholder.png';

const MapLinking = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [geocode, setGeocode] = useState([]);
  const [zoneTypes, setZoneTypes] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [filteredGeocode, setFilteredGeocode] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bus-stations`);
        const data = response.data;
        setGeocode(data);
        const types = [...new Set(data.map(geo => geo.Zone_type))];
        setZoneTypes(types);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching geocode:', error);
        setLoading(false);
      }
    };

    fetchGeocode();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      const filteredData = geocode.filter(geo => geo.Zone_type === selectedZone);
      setFilteredGeocode(filteredData);
    } else {
      setFilteredGeocode(geocode);
    }
  }, [selectedZone, geocode]);

  const fetchIcon = (ZoneType) => {
    let icon;
    if (ZoneType === 'Commercial') {
      icon = CommercialIcon;
    } else if (ZoneType === 'Government') {
      icon = GovernmentIcon;
    } else if (ZoneType === 'Park') {
      icon = ParkIcon;
    }
    return icon;
  }

  const CommercialIcon = new Icon({
    iconUrl: commercialPlaceholder,
    iconSize: [38, 38]
  });

  const GovernmentIcon = new Icon({
    iconUrl: governmentPlaceholder,
    iconSize: [38, 38]
  });

  const ParkIcon = new Icon({
    iconUrl: parkPlaceholder,
    iconSize: [38, 38]
  });

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZone(selectedValue);
  };

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-md z-10">
            <label className="block text-sm font-medium text-gray-700" htmlFor="zoneFilter">Filter by Zone Type: </label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" id="zoneFilter" onChange={handleFilterChange} value={selectedZone}>
              <option value="">All ({geocode.length})</option>
              {zoneTypes.includes('Government') && (
                <option value="Government">
                  Government ({geocode.filter(geo => geo.Zone_type === 'Government').length})
                </option>
              )}
              {zoneTypes.includes('Commercial') && (
                <option value="Commercial">
                  Commercial ({geocode.filter(geo => geo.Zone_type === 'Commercial').length})
                </option>
              )}
              {zoneTypes.includes('Park') && (
                <option value="Park">
                  Park ({geocode.filter(geo => geo.Zone_type === 'Park').length})
                </option>
              )}
            </select>
          </div>
          <MapContainer className="w-full h-full">
            <TileLayer
              attribution="glis"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredGeocode.map((geo, index) => (
              <Marker key={index} position={[geo.lat, geo.long]} icon={fetchIcon(geo.Zone_type)}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold">ID: {geo.ID}</h4>
                    <h4 className="font-bold">Name: {geo.Name}</h4>
                    <h4 className="font-bold">Local: {geo.Local}</h4>
                    <h4 className="font-bold">Zone Type: {geo.Zone_type}</h4>
                    <h4 className="font-bold">Market Infrastructure: {geo.MarketInfrastructure === 'true' ? 'Yes' : 'No'}</h4>
                    <h4 className="font-bold">Year: {geo.Year}</h4>
                    <h4 className="font-bold">Latitude: {geo.lat}</h4>
                    <h4 className="font-bold">Longitude: {geo.long}</h4>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow-md z-10">
            <div className="flex items-center mb-2">
              <img className="w-6 h-6 mr-2" src={governmentPlaceholder} alt="Government" />
              <span className="text-sm">Government</span>
            </div>
            <div className="flex items-center mb-2">
              <img className="w-6 h-6 mr-2" src={commercialPlaceholder} alt="Commercial" />
              <span className="text-sm">Commercial</span>
            </div>
            <div className="flex items-center">
              <img className="w-6 h-6 mr-2" src={parkPlaceholder} alt="Park" />
              <span className="text-sm">Park</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MapLinking;
