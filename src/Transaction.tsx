import React, { useState } from 'react'

function Transaction({transactionList, boxManager, resetTransactionsTrue} : any) {

  let [showAllTransactions, setShowAllTransactions] = useState(true);

  return (
    <>
      <div id="outerleftbox">
        {
        <>
          <div id="mytransactions" className="btn">My Transactions</div>
          <div id="chooser-flex">
            {/*
            <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser">Show all</div>
            <div id="mytransactions" onClick={()=>{
              setShowAllTransactions(false)
              console.log("selected")
              }} className="btn chooser">Show selected</div>*/
            }
          </div>
        </>
        }
        <div id="leftbox">
            {

              showAllTransactions ?
              
              transactionList.map((transaction: any) => { 
              return (
              <div key={transaction['id']} className="transflex">
                <p>{transaction['date']}</p>
                <p>{transaction['transactionName']}</p>
                <p>{transaction['cost']}</p>
                <div>
                {
                transaction['visible'] ? 
                <input className="checkbox" checked={true} onClick={()=>boxManager(true, transaction['id'])} type="checkbox" id="checkboxNoLabel" /> :
                <input className="checkbox" checked={false} onClick={()=>boxManager(false, transaction['id'])} type="checkbox" id="checkboxNoLabel" />
                }
                </div>
              </div>
              )})

              :
              
              transactionList.filter((t: any) => { 
                if (t['visible']){
                return t
                
              }              
              }).map((transaction: any)=>{
                return (
                <div key={transaction['id']} className="transflex">
                  <p>{transaction['date']}</p>
                  <p>{transaction['transactionName']}</p>
                  <p>{transaction['cost']}</p>
                  <div>
                  {
                  transaction['visible'] ? 
                  <input className="checkbox" checked={true} onClick={()=>boxManager(true, transaction['id'])} type="checkbox" id="checkboxNoLabel" /> :
                  <input className="checkbox" checked={false} onClick={()=>boxManager(false, transaction['id'])} type="checkbox" id="checkboxNoLabel" />
                  }
                  </div>
                </div>
                )

              })
            }
          </div>
        <button id="resetbutton" className="btn" onClick={()=>resetTransactionsTrue()}>Reset Transactions</button>
      </div>
    </>
  )
}

export default Transaction