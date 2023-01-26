import React from 'react'

function Toolnav({setManager, displayForm} :any) {
  return (
    <>
    <div className="tool-flex">
        <div onClick={()=>setManager((displayForm: any)=>{
          if (displayForm > 0) {
            return displayForm - 1;
          }
            return 3
          })
          } 
          className="tool-bubble symbol-button"><div id="tool-name">&lt;</div></div>
            <div className="tool-bubble"><div id="tool-name">Analytics tool</div></div>
        <div onClick={
          ()=>setManager((displayForm: any)=>{
            if (displayForm < 3){
            return displayForm + 1
            }
            return 0
          }
          )} className="tool-bubble symbol-button"><div id="tool-name">&gt;</div></div>
    </div>
    </>
  )
}

export default Toolnav