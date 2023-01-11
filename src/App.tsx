import React from 'react';
import Nav from './Nav.jsx';
import Form from './Form.jsx';
import About from './About.jsx';
import Charts from './Charts.jsx'
import { useState } from 'react';
import { useEffect } from 'react';
import '/public/App.css';
import '/public/About.css';
import '/public/Filterbar.css';
import '/public/Graphs.css';


function App() {

  function setManager(displayNum: number) {

    let sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
    setVisible(false);

    sleep(300).then((e)=>{
  
      setDisplayForm(displayNum);
      sleep(300);
        
    }).then(()=>{

      setVisible(true);

    });
  
  }

  let [displayForm, setDisplayForm] = useState(0);
  let [visible, setVisible] = useState(true);

  useEffect(() => { console.log(displayForm) }, [displayForm]);

  return (<>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
    <div id="master-div-fader" className={visible ? "visible" : "hidden"}>
      <Nav setManager={setManager}/>
      { (displayForm===0) && <Form setManager={setManager}/> }
      { (displayForm===1) && <About/> }
      { (displayForm===2) && <Charts/> }
    </div>
  </>);
}

export default App;
