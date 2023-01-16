import React from 'react'
import { useState, useEffect } from 'react'

function Filter() {

  let [filterInPressed, setFilterInPressed] = useState(false);
  let [filterOutPressed, setFilterOutPressed] = useState(false);
  let [lessThanPressed, setLessThanPressed] = useState(false);
  let [moreThanPressed, setMoreThanPressed] = useState(false);

  let [filterPressed, setFilterPressed] = useState(false);
  

  return (
    <>
      <span className="filter-flex">
        
        <div id="filter-right">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Transaction name" aria-label="Filter transactions" aria-describedby="basic-addon2"/>
            <div className="input-group-append">

            <div className="tooltip-wrap">
          
          
              <div className="input-group-prepend">
                <span className="input-group-text">?</span>
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
                className={filterInPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"}           
                type="button">Filter Out</button>

                <button
                onClick={()=> setFilterOutPressed((e)=>{ if(!e) {setFilterInPressed(false)} return filterOutPressed=!e })}
                className={filterOutPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"}
                type="button">Filter In</button>

            </div>
          </div>
          <div className="input-group">

            
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>

            <input type="text" placeholder="0.00" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            <div className="input-group-append">

              <div className="tooltip-wrap">

              <div className="input-group-prepend">
              <span className="input-group-text">?</span>
              </div>

              <div className="tooltip-content-ltgt">
             Use this to filter out transactions based on their ammounts.
              <br/><br/>
             Less than: Filters out transactions where the transaction dollar ammount is less than the user provided dollar ammount.
             <br/><br/>
             Greater than: Filters out transactions where the transaction dollar ammount is greater than the user provided dollar ammount.
          </div> 
        </div>



                <button 
                onClick={()=> setLessThanPressed((e)=>{if (!e) {setMoreThanPressed(false)} return lessThanPressed=!e})}
                className={lessThanPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"} 
                type="button">less than</button>

                <button                 
                onClick={()=> setMoreThanPressed((e)=>{if (!e) {setLessThanPressed(false)} return moreThanPressed=!e})}
                className={moreThanPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"}
                type="button">greater than</button>

            </div>
          </div>
            
          <div className="input-group" id="filter-button-div">
              <button onClick={()=> setFilterPressed((e)=>filterPressed=!e)} className={filterPressed ? "button-pressed btn btn-outline-secondary filterButton" : "btn btn-outline-secondary filterButton"} id="filterbutton" type="button">Filter transactions</button>
          </div>
        </div>
      </span>
    </>
  )
}

export default Filter