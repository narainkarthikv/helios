import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json'; // Import the loading animation

const TreemapChart = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bus-stations`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Aggregate the count of different zones
  const zoneCounts = data.reduce((counts, item) => {
    counts[item.Zone_type] = (counts[item.Zone_type] || 0) + 1;
    return counts;
  }, {});

  // Convert the aggregated counts into series data
  const seriesData = data.length > 0 ? Object.entries(zoneCounts).map(([zone, count]) => ({
    x: zone,
    y: count
  })) : [];
  const options = {
    chart: {
      type: 'treemap'
    },
    series: [{
      data: seriesData,
    }],
    title: {
      text: 'Treemap: Count of Different Zones'
    },
    tooltip: {
      enabled: true,
    }
  };
  
  return (
    <div className="dashboard-card">
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Chart options={options} series={options.series} type={options.chart.type} height={400} />
      )}
    </div>
  );
};

export default TreemapChart;
