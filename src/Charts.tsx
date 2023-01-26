import React from 'react';
import { useEffect, useState } from 'react'
import Filter from './Filter.js';
import Transactions from './Transactions.js';
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

  function Charts({transactions}: any) {

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let [purchaseNums, setPurchaseNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [paymentNums, setPaymentNums] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  let [yearlyExpenses, setYearlyExpenses] = useState(0);
  let [yearlyIncome, setYearlyIncome] = useState(0);
  let [maxY, setMaxY] = useState(0);

  let [transactionList, setTransactionList] = useState(transactions.current);

  function resetTransactionsTrue (){
    setTransactionList((transactions: any)=>{
      return Datautility.transactionReseterTrue(transactions);
    });
  }

  function boxManager(state: boolean, id: number) {
    setTransactionList((transactions: object[])=>{
      return transactions.map((transaction: any, currentIndex)=>{
          if (transaction['id'] === id) {
            if (state){
              return {...transaction, visible : false};
            } else {
              return {...transaction, visible : true};
            }
          }
          return transaction
      })
    })
  }


  useEffect(()=>{

    let {purchases, payments} = Datautility.calculateMonths(transactionList);

    setPaymentNums(payments);
    setPurchaseNums(purchases);

    setYearlyExpenses(purchases.reduce((acc: number, base : number)=>{
      return acc + base;
    }))

    setYearlyIncome(payments.reduce((acc : number, base : number)=>{
      return acc + base;
    }))

    setMaxY(Datautility.getYmax(purchases, payments));

  },[transactionList]);

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
        backgroundColor: "rgb(1, 171, 171, .60)"
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
          <Filter transactionList={transactionList} setTransactionList={setTransactionList}/>  
            <div id="graph-box">
              <Transactions transactionList={transactionList} boxManager={boxManager} resetTransactionsTrue={resetTransactionsTrue}/>
                <div className = "chartbox">
                  <Bar options={options} data={data}/>
                  <div id="numberdisplay">
                    <p>Average monthly expenses: <h2>${Math.floor(yearlyExpenses/12)}</h2></p>
                    <p>Average monthly income: <h2>${Math.floor(yearlyIncome/12)}</h2></p>
                    <p>Total yearly expenses: <h2>${Math.floor(yearlyExpenses)}</h2></p>
                    <p>Total yearly income: <h2>${Math.floor(yearlyIncome)}</h2></p> 
                  </div>    
                </div>
            </div>
        </div>
      </>
    );
}

export default Charts
