import React, { useState, useEffect, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Lottie from "lottie-react";
import './css/stats.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import loadingAnimation from '../../assets/animations/loading.json';

const LargeSpace = () => {
  const [topRevenueData, setTopRevenueData] = useState([]);
  const [floodRiskScores, setFloodRiskScores] = useState([]);
  const [environmentalSafetyData, setEnvironmentalSafetyData] = useState([]);
  const [revenueError, setRevenueError] = useState(null);
  const [floodRiskError, setFloodRiskError] = useState(null);
  const [environmentalSafetyError, setEnvironmentalSafetyError] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRevenueResponse, floodRiskResponse, environmentalSafetyResponse] = await Promise.all([
          axios.get('https://glis-yqvt.onrender.com/api/top-revenue'),
          axios.get('https://glis-yqvt.onrender.com/api/flood-risk'),
          axios.get('https://glis-yqvt.onrender.com/api/envi-safety')
        ]);
        setTopRevenueData(topRevenueResponse.data);
        setFloodRiskScores(floodRiskResponse.data);
        setEnvironmentalSafetyData(environmentalSafetyResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRevenueError('Error fetching revenue data. Please try again later.');
        setFloodRiskError('Error fetching flood risk data. Please try again later.');
        setEnvironmentalSafetyError('Error fetching environmental safety data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = useMemo(() => ({
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }), []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {loading ? (
        <div className="flex justify-center items-center h-64" ref={loadingRef}>
          {/* Lottie animation */}
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <>
          {revenueError || floodRiskError || environmentalSafetyError ? (
            <div className="text-red-500 text-center">
              {revenueError || floodRiskError || environmentalSafetyError}
            </div>
          ) : (
            <Slider className='stats-slide' {...sliderSettings}>
              <div className="p-4">
                <h2 className='text-xl font-bold mb-4'>Top 5 Revenue Generation Zones</h2>
                <table className='min-w-full bg-white'>
                    <thead>
                      <tr className='bg-gray-200'>
                        <th className='py-2 px-4'>Name</th>
                        <th className='py-2 px-4'>Revenue</th>
                        <th className='py-2 px-4'>Commercial/Government/Park</th>
                        <th className='py-2 px-4'>Total Area</th>
                        <th className='py-2 px-4'>Accessibility score</th>
                      </tr>
                    </thead>
                    <tbody>
                    {topRevenueData.map((area, index) => (
                      <tr className='border-b' key={index}>
                        <td className='py-2 px-4'>{area.Name}</td>
                        <td className='py-2 px-4'>{area.Rev}</td>
                        <td className='py-2 px-4'>{area.Zone_type}</td>
                        <td className='py-2 px-4'>{area.Size}</td>
                        <td className='py-2 px-4'>{area.Acc_Score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <h2 className='text-xl font-bold mb-4'>Top 5 Flood Risk Zones</h2>
                <table className='min-w-full bg-white'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='py-2 px-4'>Name</th>
                      <th className='py-2 px-4'>Flood Risk Score</th>
                      <th className='py-2 px-4'>Past Flood Events</th>
                      <th className='py-2 px-4'>Flood Protection Measures</th>
                      <th className='py-2 px-4'>Flood Zone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {floodRiskScores.map((area, index) => (
                      <tr className='border-b' key={index}>
                        <td className='py-2 px-4'>{area.Name}</td>
                        <td className='py-2 px-4'>{area.FloodRiskScore}</td>
                        <td className='py-2 px-4'>{area.HistoricalFloodEvents}</td>
                        <td className='py-2 px-4'>{area.FloodProtectionMeasures}</td>
                        <td className='py-2 px-4'>{area.FloodZone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <h2 className='text-xl font-bold mb-4'>Top 5 Environmental Safety Zones</h2>
                <table className='min-w-full bg-white'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='py-2 px-4'>Name</th>
                      <th className='py-2 px-4'>Air Quality Index (AQI)</th>
                      <th className='py-2 px-4'>Market Infrastructure</th>
                      <th className='py-2 px-4'>Environmental Features</th>
                      <th className='py-2 px-4'>Vegetation Cover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {environmentalSafetyData.map((area, index) => (
                      <tr className='border-b' key={index}>
                        <td className='py-2 px-4'>{area.Name}</td>
                        <td className='py-2 px-4'>{area.AQI}</td>
                        <td className='py-2 px-4'>{area.MarketInfrastructure ? 'Yes' : 'No'}</td>
                        <td className='py-2 px-4'>{area.EnvironmentalFeatures}</td>
                        <td className='py-2 px-4'>{area.VegetationCover}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Slider>
          )}
        </>
      )}
    </div>
  );
};

export default LargeSpace;
