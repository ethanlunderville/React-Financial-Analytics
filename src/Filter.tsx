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
              <div className="input-group-prepend">
                <span className="input-group-text">?</span>
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
              <div className="input-group-prepend">
              <span className="input-group-text">?</span>
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