import React, { useState, useEffect, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Lottie from "lottie-react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/Stats.css';
import loadingAnimation from '../../../assets/animations/loading.json'; // Import the loading animation

const LargeSpace = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
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
          axios.get(`${backendURL}/api/top-revenue`),
          axios.get(`${backendURL}/api/flood-risk`),
          axios.get(`${backendURL}/api/envi-safety`)
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
    <div className="dashboard-card">
      {loading ? (
        <div className="loading-animation" ref={loadingRef}>
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <>
          {revenueError || floodRiskError || environmentalSafetyError ? (
            <div className="error-message">
              {revenueError || floodRiskError || environmentalSafetyError}
            </div>
          ) : (
            <Slider className='stats-slide' {...sliderSettings}>
              <div className="slide-content revenue-slide">
                <h2 className='stats-header'>Top 5 Revenue Generation Zones</h2>
                <table className='stats-table-revenue'>
                    <thead>
                      <tr className='stats-table-row-header'>
                        <th className='stats-table-head'>Name</th>
                        <th className='stats-table-head'>Revenue</th>
                        <th className='stats-table-head'>Commercial/Government/Park</th>
                        <th className='stats-table-head'>Total Area</th>
                        <th className='stats-table-head'>Accessibility score</th>
                      </tr>
                    </thead>
                    <tbody className='stats-table-body'>
                    {topRevenueData.map((area, index) => (
                      <tr className='stats-table-row' key={index}>
                        <td className='stats-table-data'>{area.Name}</td>
                        <td className='stats-table-data'>{area.Rev}</td>
                        <td className='stats-table-data'>{area.Zone_type}</td>
                        <td className='stats-table-data'>{area.Size}</td>
                        <td className='stats-table-data'>{area.Acc_Score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="slide-content flood-risk-slide">
                <h2 className='stats-header'>Top 5 Flood Risk Zones</h2>
                <table className='stats-table-flood'>
                  <tbody>
                    <tr className='stats-table-row-header'>
                      <th className='stats-table-head'>Name</th>
                      <th className='stats-table-head'>Flood Risk Score</th>
                      <th className='stats-table-head'>Past Flood Events</th>
                      <th className='stats-table-head'>Flood Protection Measures</th>
                      <th className='stats-table-head'>Flood Zone</th>
                    </tr>
                    {floodRiskScores.map((area, index) => (
                      <tr className='stats-table-row' key={index}>
                        <td className='stats-table-data'>{area.Name}</td>
                        <td className='stats-table-data'>{area.FloodRiskScore}</td>
                        <td className='stats-table-data'>{area.HistoricalFloodEvents}</td>
                        <td className='stats-table-data'>{area.FloodProtectionMeasures}</td>
                        <td className='stats-table-data'>{area.FloodZone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="slide-content environmental-safety-slide">
                <h2 className='stats-header'>Top 5 Environmental Safety Zones</h2>
                <table className='stats-table-env'>
                  <tbody>
                    <tr className='stats-table-row-header'>
                      <th className='stats-table-head'>Name</th>
                      <th className='stats-table-head'>Air Quality Index (AQI)</th>
                      <th className='stats-table-head'>Market Infrastructure</th>
                      <th className='stats-table-head'>Environmental Features</th>
                      <th className='stats-table-head'>Vegetation Cover</th>
                    </tr>
                    {environmentalSafetyData.map((area, index) => (
                      <tr className='stats-table-row' key={index}>
                        <td className='stats-table-data'>{area.Name}</td>
                        <td className='stats-table-data'>{area.AQI}</td>
                        <td className='stats-table-data'>{area.MarketInfrastructure === 'true' ? 'Yes' : 'No'}</td>
                        <td className='stats-table-data'>{area.EnvironmentalFeatures}</td>
                        <td className='stats-table-data'>{area.VegetationCover}</td>
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
