import React from 'react';
import Nav from './Nav.js';
import Form from './Form.js';
import About from './About.js';
import Charts from './Charts.js';


import { useState } from 'react';
import { useEffect } from 'react';
import '/public/App.css';
import '/public/About.css';
import '/public/Filterbar.css';
import '/public/Graphs.css';
import '/public/Transaction.css';

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
        sleep(1500).then(()=>{setVisible(true)});
      } else {
        sleep(300).then(()=>{setVisible(true)});
      }
        
    })
  
  }

  let [displayForm, setDisplayForm] = useState(0);
  let [visible, setVisible] = useState(true);
  let [transactions, setTransactions] = useState([]);

  useEffect(() => { 
  console.log('--------');
  console.log(transactions)
  console.log('--------');
  }, [transactions]);

  return (<>
      <div id="master-div-fader" className={visible ? "visible" : "hidden"}>
      <Nav setManager={setManager}/>
      { (displayForm===0) && <Form setManager={setManager} setTransactions={setTransactions}/> }
      { (displayForm===1) && <About/> }
      { (displayForm===2) && <Charts transactions={transactions}/> }
    </div>
  </>);
}

export default App;
