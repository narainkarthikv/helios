import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from "lottie-react";
import loadingAnimation from '../../../assets/animations/loading.json';

const PieChart = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [sizeData, setSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bus-stations`);
        const processedData = response.data.map(item => ({
          label: item.Name,
          value: item.Size
        }));
        setSizeData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'pie',
    },
    labels: sizeData.map(item => item.label),
    dataLabels: {
      enabled: false,
    }
  };

  const series = sizeData.map(item => item.value);

  return (
    <div className="dashboard-card">
      <h2 className='graph-card-header'>Pie Chart: Size Distribution in Acres</h2>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Chart options={options} series={series} type="pie" height={350} />
      )}
    </div>
  );
};

export default PieChart;
