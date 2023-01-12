import React, { useEffect } from 'react'
import Filter from './Filter.jsx';
import { useState } from 'react';


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

function Charts({transactions}) {

  const labels = [1,2,3,4,5,6,7,8,9,10,11,12];
  let [purchaseNums, setPurchaseNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [paymentNums, setPaymentNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);

  let [options, setOptions] = useState ({
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 600
      }
    }
  });
  
  let [data, setData] = useState ({
    labels,
    datasets: [
      {
        label: "Income",
        data: [1,3,3,4,5,6,7,8,9,9,500],
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      },
      {
        label: "Expenses",
        data: [1,2,3,4,5,6,7,8,9,9,9],
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ],
  });

    return (
      <>
          <Filter/>
          
          <div id="graph-box-outer">
          <div id="graph-box">
          <box><Bar options={options} data={data}/></box>
          <box><Bar options={options} data={data}/></box>s
          </div>
          </div>
      </>
    );
  
}

export default Charts