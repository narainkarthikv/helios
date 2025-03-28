import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';

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
      const response = await axios.get(`${backendURL}/api/bus-stations/${id}`);
      setRecord(response.data);
    } catch (error) {
      console.error(error);
      setError('Error fetching record. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div className='text-red-500'>{error}</div>
      ) : (
        <div>
          <h3 className='text-xl font-bold mb-4'>RECORD {record.ID} DETAILS:</h3>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border p-2'>Headers</th>
                <th className='border p-2'>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border'>
                <td className='border p-2'>ID</td>
                <td className='border p-2'>{record.ID}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Name</td>
                <td className='border p-2'>{record.Name}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Local Body</td>
                <td className='border p-2'>{record.Local}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Region</td>
                <td className='border p-2'>{record.Reg}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Revenue</td>
                <td className='border p-2'>{record.Rev}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Zone Type</td>
                <td className='border p-2'>{record.Zone_type}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Year</td>
                <td className='border p-2'>{record.Year}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Flood risk score</td>
                <td className='border p-2'>{record.FloodRiskScore}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Flood zone</td>
                <td className='border p-2'>{record.FloodZone}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Elevation</td>
                <td className='border p-2'>{record.Elevation}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Distance To WaterBodies</td>
                <td className='border p-2'>{record.DistanceToWaterBodies}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Historical Flood Events</td>
                <td className='border p-2'>{record.HistoricalFloodEvents}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Flood Protection Measures</td>
                <td className='border p-2'>{record.FloodProtectionMeasures}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Soil Type</td>
                <td className='border p-2'>{record.SoilType}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Vegetation Cover</td>
                <td className='border p-2'>{record.VegetationCover}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Market Infrastructure</td>
                <td className='border p-2'>{record.MarketInfrastructure === 'true' ? 'Yes' : 'No'}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>UrbanizationLevel</td>
                <td className='border p-2'>{record.UrbanizationLevel}</td>
              </tr>
              <tr className='border'>
                <td className='border p-2'>Climate Data</td>
                <td className='border p-2'>{record.ClimateData}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recordview;
