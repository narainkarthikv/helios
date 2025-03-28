import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/loading.json';
import './css/recordview.css';

const Recordview = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecord(id);
  }, [id]);

  const fetchRecord = async (id) => {
    try {
      const response = await axios.get(`${backendURL}api/bus-stations/${id}`);
      setRecord(response.data);
    } catch (error) {
      console.error(error);
      setError('Error fetching record. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='RecordView'>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h3 className='record-list-header'>RECORD {record.ID} DETAILS:</h3>
          <table className='record-table'>
             <thead>
                <tr> 
                    <th className='record-table-head'>Headers</th>
                    <th className='record-table-head'>Details</th>
                </tr>
            </thead>

            <tbody>
                <tr className='record-table-row'>
                    <td className='record-table-data'>ID</td>
                    <td className='record-table-data'>{record.ID}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Name</td>
                    <td className='record-table-data'>{record.Name}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Local Body</td>
                    <td className='record-table-data'>{record.Local}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Region</td>
                    <td className='record-table-data'>{record.Reg}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Revenue</td>
                    <td className='record-table-data'>{record.Rev}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Zone Type</td>
                    <td className='record-table-data'>{record.Zone_type}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Year</td>
                    <td className='record-table-data'>{record.Year}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Flood risk score</td>
                    <td className='record-table-data'>{record.FloodRiskScore}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Flood zone</td>
                    <td className='record-table-data'>{record.FloodZone}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Elevation</td>
                    <td className='record-table-data'>{record.Elevation}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Distance To WaterBodies</td>
                    <td className='record-table-data'>{record.DistanceToWaterBodies}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Historical Flood Events</td>
                    <td className='record-table-data'>{record.HistoricalFloodEvents}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Flood Protection Measures</td>
                    <td className='record-table-data'>{record.FloodProtectionMeasures}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Soil Type</td>
                    <td className='record-table-data'>{record.SoilType}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Vegetation Cover</td>
                    <td className='record-table-data'>{record.VegetationCover}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Market Infrastructure</td>
                    <td className='record-table-data'>{record.MarketInfrastructure ? 'Yes' : 'No'}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>UrbanizationLevel</td>
                    <td className='record-table-data'>{record.UrbanizationLevel}</td>
                </tr>
                <tr className='record-table-row'>
                    <td className='record-table-data'>Climate Data</td>
                    <td className='record-table-data'>{record.ClimateData}</td>
                </tr>
            </tbody>
                    
          </table>
        </div>
      )}
    </div>
  );
};

export default Recordview;
