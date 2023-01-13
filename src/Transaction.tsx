import React from 'react'
import {useState} from 'react';


function Transaction({transactions} : any) {
  return (
    <>
    

        

      <div id="leftbox">

        

        {transactions.map((transaction: any)=>{ return (
              
          <div className="transflex">
            <p>{transaction['date']}</p>
            <p>{transaction['transactionName']}</p>
            <p>{transaction['cost']}</p>
            <div>
              {transaction['visible'] ? <input checked={true} type="checkbox" id="checkboxNoLabel" /> : <input checked={false} type="checkbox" id="checkboxNoLabel" />}
            </div>
          </div>
          
        )})}
      </div>
      
    </>
  )
}

export default Transaction