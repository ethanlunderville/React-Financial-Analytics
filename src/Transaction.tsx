import React from 'react'
import { useState, useEffect } from 'react';

function Transaction({transaction, selectedTracker}: any) {

    let [selected, setSelected] = useState(false);

  return ( 
            <div key={transaction['id']} onClick={()=>{
            selectedTracker(transaction['id'])
            setSelected(e=>!e)
            }
            } className={selected ? "transflex selected" : "transflex"}>
                          <p>{transaction['date']}</p>
                          <p>{transaction['transactionName']}</p>
                          <p>{transaction['cost']}</p>
            </div> 
  )
}

export default Transaction