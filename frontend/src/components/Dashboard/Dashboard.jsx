import React from 'react';
import LargeSpace from './stats';
// import Widgets from './widgets';
import Heatmap from './Graphs/HeatMap';
import Bar from'./Graphs/BarChart';
import PieChart from './Graphs/PieChart';
import Treemap from './Graphs/TreeMap';
import Sample from './Graphs/sample';

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <LargeSpace title="Highest Values" className='p-4 bg-white rounded-lg shadow-md' /> 
        {/* <Widgets title="Population density vs foot tracffic" className='p-4 bg-white rounded-lg shadow-md' /> */}
        <Heatmap title="plot" className='p-4 bg-white rounded-lg shadow-md' />
        <Bar title="Flood Risk Scores" className='p-4 bg-white rounded-lg shadow-md'/>
        <PieChart title="plot" className='p-4 bg-white rounded-lg shadow-md'/>
        <Treemap title="plot" className='p-4 bg-white rounded-lg shadow-md'/>
        <Sample title="plot" className='p-4 bg-white rounded-lg shadow-md'/>
      </div>
    </div>
  );
};

export default Dashboard;
