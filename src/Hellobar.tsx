import React from 'react'

function Hellobar() {
  return (
    <>
        
        <div id="blackbar">
          <div id="hellobar-flex">
            <div id="left-part">
              
              <div id="hello" className='text'>Hello Ethan</div>
              <div id="util-flex">
                <p className='text' id="showing-insights">SHOWING INSIGHTS FOR</p>
              </div>
            </div>
            <div id="right-part">
            
              <button className='month-date'>YEAR</button>
              <button className='month-date'>2022</button>
            
            </div> 
          </div>
        </div>
    </>
  )
}

export default Hellobar