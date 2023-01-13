import React, { useEffect } from 'react'
import Filter from './Filter.js';
import Transaction from './Transaction.js';
import { useState } from 'react';
import {Datautility} from './utilities/datautility';

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

function Charts(this: any, {transactions}: any): any {


  let [transactionsCopy, setTransactionsCopy] = useState(Datautility.transactionCopier(transactions));

  const labels = [1,2,3,4,5,6,7,8,9,10,11,12];
  let [purchaseNums, setPurchaseNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [paymentNums, setPaymentNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [maxY, setMaxY] = useState(0);

  useEffect(()=>{

    console.log('this ran')

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

    })

    setPaymentNums(purchases);
    setPurchaseNums(payments);
    setMaxY(Datautility.getYmax(purchases, payments));

  },[]);

  let options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxY
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
                    <p>Average monthly expenses: $5,000</p>
                    <p>Average monthly income: $5,000</p>
                    <p>Total yearly expenses: $5,000</p>
                    <p>Total yearly income: $5,000</p> 
                    </div>    
              </div>

            </div>
          </div>
      </>
    );
  
}

export default Charts
