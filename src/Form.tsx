import React from 'react';
import { useState } from 'react';
import Logo from './techlogo.jpg';
import { Statementparser } from './utilities/statementparser.js';

function Form({setManager, setTransactions} : any) {

  let [selectedFile, setSelectedFile] = useState("");

  function onChange(event: any) { 

    var file = event.target.files[0];
    var fileReader = new FileReader();
    let transactions = []

    fileReader.onload = function(event) {

      if (event.target !== null){

      transactions = (event.target.result as string).split('\n');
      transactions = Statementparser.bofaParser(transactions);
      setTransactions(transactions);
      
      }
      
    };

    fileReader.readAsText(file);

  }

  return (
    <>
    <div id="form-box">
    <div id ="form-center-div">
    <img src={Logo} height="160 px;" width="160 px;" />
      <div id="form-outer">
    
        <div className="form-group">
        <label>Select a bank</label>
        <select className="form-control" id="bankselect">
          <option>Bank of America</option>
          <option>Chase</option>
          <option>Wells Fargo</option>
          <option>American Express</option>
        </select>
        </div>

        <div className="form-group">
        <label>Select the type of report to generate</label>
        <select className="form-control" id="reportselect">
          <option>Yearly</option>
          <option>Monthly</option>
        </select >
        </div>

        <div className="form-group">
        <label>Select the type of analysis you would like to do</label>
        <select className="form-control" id="reportselect">
          <option>Budgeting</option>
          <option>Income and expenses</option>
        </select >
        </div>

        <div className="form-group">
        <label id="month-or-year">Select a year</label>
        <input type="text" className="form-control" id="year"/>
        </div>

        <label>Please provide bank generated statement file</label>
        <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Upload</span>
              </div>
              <div className="custom-file">                
                <input
                  id="inputGroupFile01"
                  type="file"
                  className="custom-file-input"
                  value={selectedFile}
                  onChange={(e) => {onChange(e);}}
                />                
                <label className="custom-file-label" id="filename-display">Choose file</label>
              </div>
            </div>

        <div className="form-check form-group">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required/>
          <label className="form-check-label">
            Please check to agree to Terms of Service
          </label>
        </div>

      </div>
      <button className="btn-sm" type="submit" onClick={()=>setManager(2)}>Generate Insights</button>
    </div>
  </div>
    </>
  )
}

export default Form