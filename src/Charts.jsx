import React from 'react'
import Filter from './Filter.jsx';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 600
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [{
    label: "chartname",
    data: [22,3,11,2,3,4],
    borderWidth: 1,
    backgroundColor: "#fffff",
  }],
};


function Charts() {

    return (
      <>
          <Filter/>
          
          <div id="graph-box-outer">
          <div id="graph-box">
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>
          </div>
          </div>
      </>
    );
  
}

export default Charts