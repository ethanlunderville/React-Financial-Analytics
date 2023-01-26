import React from 'react';
import Nav from './Nav.js';
import Form from './Form.js';
import About from './About.js';
import Charts from './Charts.js';
import Hellobar from './Hellobar.js';
import Accounts from './Accounts.js';
import Toolnav from './Toolnav.js';
import Spreadsheets from './Spreadsheets.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Datautility } from './utilities/datautility.js';

function App() {

  //Fades page in and out when changing views
  function setManager(displayNum: number) {

    let sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    //reset transaction visibility for other tools
    transactions.current =  Datautility.transactionReseterTrue(transactions.current);
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
  let transactions: any = useRef([]);

  return (<>
    
      <Hellobar/>
      <Accounts/>
      <div id="master-div-fader" className={visible ? "visible" : "hidden"}>
        {/*<Nav setManager={setManager}/>*/}
        { (displayForm===0) && <Form setManager={setManager} transactions={transactions}/> }
        { (displayForm===1) && <About/> }
        { (displayForm===2) && <Charts transactions={transactions}/> }
        { (displayForm===3) && <Spreadsheets transactions={transactions}/> }
      </div>
      <Toolnav setManager={setManager} displayForm={displayForm}/>
    
  </>);
}

export default App;
