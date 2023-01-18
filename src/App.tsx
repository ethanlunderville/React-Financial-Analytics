import React from 'react';
import Nav from './Nav.js';
import Form from './Form.js';
import About from './About.js';
import Charts from './Charts.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


function App() {

  //Fades page in and out when changing views
  function setManager(displayNum: number) {

    let sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
    setVisible(false);

    sleep(300).then((e)=>{
  
      setDisplayForm(displayNum);
      if (displayNum === 2){
        sleep(2000).then(()=>{setVisible(true)});
      } else {
        sleep(300).then(()=>{setVisible(true)});
      }
        
    })
  
  }

  let [displayForm, setDisplayForm] = useState(0);
  let [visible, setVisible] = useState(true);
  let transactions = useRef([]);

  return (<>
      <div id="master-div-fader" className={visible ? "visible" : "hidden"}>
      <Nav setManager={setManager}/>
      { (displayForm===0) && <Form setManager={setManager} transactions={transactions}/> }
      { (displayForm===1) && <About/> }
      { (displayForm===2) && <Charts transactions={transactions}/> }
    </div>
  </>);
}

export default App;
