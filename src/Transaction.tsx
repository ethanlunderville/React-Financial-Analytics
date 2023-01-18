import React, { useState } from 'react'

function Transaction({transactionList, boxManager, resetTransactionsTrue} : any) {

  let [checked, setChecked] = useState(true);

  return (
    <>
      <div id="outerleftbox">
        {
        <div id="mytransactions" className="btn">My Transactions</div>
        }
        <div id="leftbox">
            {transactionList.map((transaction: any, index: number) => { 
              return (
              <div key={index} className="transflex">
                <p>{transaction['date']}</p>
                <p>{transaction['transactionName']}</p>
                <p>{transaction['cost']}</p>
                <div>
                  {<input className="checkbox" onChange={boxManager(true,index)} type="checkbox" id="checkboxNoLabel" />}
                </div>
              </div>
            )})}
          </div>
        <button id="resetbutton" className="btn" onClick={()=>resetTransactionsTrue()}>Reset Transactions</button>
      </div>
    </>
  )
}

export default Transaction