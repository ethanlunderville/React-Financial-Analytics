import React from 'react'
import { useState, useRef } from 'react'
import { Datautility } from './utilities/datautility';

function Filter({setTransactionList}: any) {

  let [filterInPressed, setFilterInPressed] = useState(false);
  let [filterOutPressed, setFilterOutPressed] = useState(false);
  let [greaterThanInput, setGreaterThanInput] = useState('');
  let [lessThanInput, setLessThanInput] = useState('');

  let [nameInput, setNameInput] = useState('');
  
  return (
    <>
      <span className="filter-flex">
        
        <div id="filter-right">
          <div className="input-group">
            <input id="transaction-filter-input"

              type="text" className="form-control"
              placeholder="Transaction name" 
              aria-label="Filter transactions" 
              aria-describedby="basic-addon2"
              value={nameInput}
              onChange={e=>setNameInput(e.target.value)}
            />
            <div className="input-group-append">

            <div className="tooltip-wrap">
          
          
                <div className="input-group-prepend">
                  <span className="input-group-text symbolic">?</span>
                </div>

                <div className="tooltip-content-filter">
                    Use this to decide what data to include or exclude.
                    <br/><br/>
                    Filter out: Filters out transactions all that include user specified keywords.
                    <br/><br/>
                    Filter in: Only shows transactions containing user specified keywords.
                    <br/><br/>
                    Note: In order to filter multiple words at once seperate the desired words with spaces.
                  </div> 
                </div>

                <button 
                onClick={()=> setFilterInPressed((e)=>{ if(!e) {setFilterOutPressed(false)} return filterInPressed=!e})}
                className={filterInPressed ? "button-pressed btn btn-outline-secondary symbolic" : "btn btn-outline-secondary symbolic"}           
                type="button">Filter In</button>

                <button
                onClick={()=> setFilterOutPressed((e)=>{ if(!e) {setFilterInPressed(false)} return filterOutPressed=!e })}
                className={filterOutPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"}
                type="button">Filter Out</button>

            </div>
          </div>
          <div className="input-group" id="lgtg-group">

            
            <div className="input-group-prepend">
              <span className="input-group-text symbolic">$</span>
            </div>

            <input className="ammount-filter-input form-control" 
            type="text" 
            placeholder="0.00" 
            aria-label="Amount (to the nearest dollar)"
            value={greaterThanInput}
            onChange={e=>setGreaterThanInput(e.target.value)}

            />
            <p id="rangesym"> &lt; x &lt; </p>

            <div className="input-group-prepend">
            <span className="input-group-text symbolic">$</span>
            </div>

            <input className="ammount-filter-input form-control" 
            type="text" 
            placeholder="0.00" 
            aria-label="Amount (to the nearest dollar)"
            value={lessThanInput}
            onChange={e=>setLessThanInput(e.target.value)}

            />

            <div className="input-group-append">

              <div className="tooltip-wrap">

              <div className="input-group-prepend">
              <span className="input-group-text symbolic">?</span>
              </div>

              <div className="tooltip-content-ltgt">
             Use this to filter out transactions based on their ammounts.
              <br/><br/>
             Less than: Filters out transactions where the transaction dollar ammount is less than the user provided dollar ammount.
             <br/><br/>
             Greater than: Filters out transactions where the transaction dollar ammount is greater than the user provided dollar ammount.
              </div> 
            </div>

            </div>
          </div>
            
          <div className="input-group" id="filter-button-div">
              <button onClick={
                    ()=>{
                    
                    setTransactionList((t: any) =>{

                    console.log("setTransaction ran");

                    let ret = Datautility.filterhandler (t,
                    filterInPressed, filterOutPressed, nameInput,
                    greaterThanInput, lessThanInput)

                    return ret 

                  })}}
                  id="filterbutton" type="button">
                  Filter transactions
              </button>
          </div>
        </div>
      </span>
    </>
  )
}

export default Filter