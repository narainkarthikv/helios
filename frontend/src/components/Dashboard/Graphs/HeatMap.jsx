import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json'; // Import your loading animation JSON file

const HeatmapChart = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bus-stations`);
        const data = response.data;
        const heatmapChartData = data.map(item => ({
          x: item.PopulationDensity,
          y: item.Rev,
          value: item.FootTraffic,
          accScore: item.Acc_Score,
          aqi: item.AQI
        }));
        setHeatmapData(heatmapChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-card">
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <Chart
          options={{
            chart: {
              type: 'heatmap',
              height: 350
            },
            dataLabels: {
              enabled: false
            },
            colors: ["#008FFB"],
            title: {
              text: 'Heatmap of Population Density vs Revenue'
            },
            xaxis: {
              title: {
                text: 'Population Density'
              }
            },
            yaxis: {
              title: {
                text: 'Revenue'
              }
            },
            tooltip: {
              custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const { accScore, aqi } = w.config.series[seriesIndex].data[dataPointIndex];
                return (
                  '<div class="tooltip">' +
                  '<span>Accessibility Score: ' + accScore + '</span>' +
                  '<br>' +
                  '<span>AQI: ' + aqi + '</span>' +
                  '</div>'
                );
              }
            }
          }}
          series={[{
            name: '',
            data: heatmapData
          }]}
          type="heatmap"
          height={400}
        />
      )}
    </div>
  );
};

export default HeatmapChart;
