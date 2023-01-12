import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'





function Filter() {

  let [filterInPressed, setFilterInPressed] = useState(false);
  let [filterOutPressed, setFilterOutPressed] = useState(false);
  let [lessThanPressed, setLessThanPressed] = useState(false);
  let [moreThanPressed, setMoreThanPressed] = useState(false);

  let [filterPressed, setFilterPressed] = useState(false);
  

  return (
    <>
        <div className="filter-flex">
            
          <div className="input-group mb-3" id="reset-button-div">
              <button id="filterButton" onClick={()=> setFilterPressed((e)=>filterPressed=!e)} className={filterPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"} type="button">Reset data</button>
          </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Company name" aria-label="Filter transactions" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    
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
            

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" placeholder="0.00" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <div className="input-group-append">

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
            
            <div className="input-group mb-3" id="filter-button-div">
              <button id="filterButton" onClick={()=> setFilterPressed((e)=>filterPressed=!e)} className={filterPressed ? "button-pressed btn btn-outline-secondary" : "btn btn-outline-secondary"} type="button">Filter</button>
            </div>
            
        </div>
        
    </>
  )
}

export default Filter