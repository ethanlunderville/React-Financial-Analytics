import React from 'react';
import { useEffect, useState } from 'react'
import Filter from './Filter.js';
import Transaction from './Transaction.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'react-chartjs-2';
import { Datautility } from './utilities/datautility';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
  Legend
);

function Charts(this: any, {transactions}: any): any {

  let [transactionsCopy, setTransactionsCopy] = useState(Datautility.transactionCopier(transactions));

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let [purchaseNums, setPurchaseNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [paymentNums, setPaymentNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [maxY, setMaxY] = useState(0);

  useEffect(()=>{

    let purchases: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    let payments: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]; 

    transactionsCopy.forEach((transaction: any)=>{

      console.log(transaction);

      if (transaction['cost'] > 0) {
        //console.log(transaction['cost'])
      purchases[transaction['month']-1] += transaction['cost'];

      } else {

      payments[transaction['month']-1] -= transaction['cost'];

      } 

    });

    setPaymentNums(purchases);
    setPurchaseNums(payments);
    setMaxY(Datautility.getYmax(purchases, payments));

  },[]);

  let options: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxY
      }
    },
    plugins: {
      datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: Math.round,
          font: {
          }
      }
  }
  };
  
  let data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: paymentNums,
        backgroundColor: "rgba(53, 162, 235, 0.75)"
      },
      {
        label: "Expenses",
        data: purchaseNums,
        backgroundColor: "rgba(255, 99, 132, 0.75)"
      }
    ],
  };
    return (
      <>
        <div id="graph-box-outer">
          <Filter/>  
            <div id="graph-box">
              <Transaction transactions={transactionsCopy}/>
                <div className = "chartbox">
                  <Bar options={options} data={data}/>
                  <div id="numberdisplay">
                    <p>Average monthly expenses: <h2>$5,000</h2></p>
                    <p>Average monthly income: <h2>$5,000</h2></p>
                    <p>Total yearly expenses: <h2>$5,000</h2></p>
                    <p>Total yearly income: <h2>$5,000</h2></p> 
                  </div>    
                </div>
            </div>
        </div>
      </>
    );
}

export default Charts
