import React, { useState } from 'react'

function Transactions({transactionList, boxManager, resetTransactionsTrue} : any) {

  let [showAllTransactions, setShowAllTransactions] = useState(true);
  let [visible, setVisible] = useState(true);

  return (
    <>
      <div id="outerleftbox">
        {
        <>
          <div id="chooser-flex">
            
            { 
            showAllTransactions ? 
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser">Show all</div> :
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser chosen-button">Show all</div> 
            }
            { 
              showAllTransactions ?
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser chosen-button">Show selected</div>:
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser">Show selected</div>
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
                <div key={transaction['id']} className={visible ? "transflex visible" : "transflex hidden" }>
                  <p>{transaction['date']}</p>
                  <p>{transaction['transactionName']}</p>
                  <p>{transaction['cost']}</p>
                  <div>
                  {
                  transaction['visible'] 
                  
                  ? 

                  <input className="checkbox"
                  checked={true} 
                  onClick={()=>{
                    let sleep = (milliseconds: number) => {
                      return new Promise(resolve => setTimeout(resolve, milliseconds))
                    }
                    setVisible(false)
                    sleep(400).then(()=>{
                      boxManager(true, transaction['id'])
                      setVisible(true);
                    })
                  }} 
                  type="checkbox" 
                  id="checkboxNoLabel" /> 
                  
                  :
                  
                  <input className="checkbox"
                  checked={false}
                  onClick={()=>{
                    boxManager(false, transaction['id'])
                  }} 
                  type="checkbox" 
                  id="checkboxNoLabel" />
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

export default Transactions