import React from 'react'

function Transaction({transactions} : any) {
  return (
    <>
      <div id="outerleftbox">
        {
        <div id="mytransactions" className="btn">My Transactions</div>
        }
        <div id="leftbox">
            {transactions.map((transaction: any) => { return (
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
        <button id="resetbutton" className="btn">Reset Transactions</button>
      </div>
    </>
  )
}

export default Transaction