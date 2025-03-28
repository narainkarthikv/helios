import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json';

const BarChart = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${backendURL}/api/bus-stations`)
      .then(response => {
        const newData = response.data.map(item => ({
          x: item['Name'],
          y: item['FloodRiskScore']
        }));
        setBarData(newData);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const options = {
    chart: {
      type: 'bar',
      height: 400
    },
    xaxis: {
      title: {
        text: ''
      }
    },
    yaxis: {
      title: {
        text: 'Flood Risk Score'
      }
    },
    title: {
      text: 'Flood Risk Scores',
      align: 'center'
    },
    tooltip:
    {
      enabled: false,
    }
  };

  return (
    <div className="dashboard-card">
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <Chart options={options} series={[{ data: barData }]} type="bar" height={400} />
      )}
    </div>
  );
};

export default BarChart;
