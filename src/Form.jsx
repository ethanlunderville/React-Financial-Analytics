import { useState, useEffect } from 'react';
import React from 'react';
import Logo from './techlogo.jpg';
import {Statementparser} from './utilities/statementparser.tsx';
function Form({setManager}) {

  let [selectedFile, setSelectedFile] = useState("");

  function onChange(event, setTransactions) { 


    var file = event.target.files[0];
    var fileReader = new FileReader();
    let transactions = []

    fileReader.onload = function(event) {
      //console.log(event.target.result)
      transactions = event.target.result.split('\n');
      Statementparser.bofaParser(transactions);
    };
    fileReader.readAsText(file);


  }

  return (
    <>
    <div id="form-box">
    <img src={Logo} height="160 px;" width="160 px;" />
    <div id ="form-center-div">
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
        <label id="month-or-year">Select a year</label>
        <input type="text" className="form-control" id="year"/>
        </div>

        <label>Please provide bank generated statement file</label>
        <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                
                <input

                  id="inputGroupFile01"

                  type="file"

                  class="custom-file-input"

                  value={selectedFile}

                  onChange={(e) => {onChange(e);}}

                />
                
                <label class="custom-file-label" for="inputGroupFile01" id="filename-display">Choose file</label>
              </div>
            </div>


        <div className="form-check form-group">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required/>
          <label className="form-check-label" for="flexCheckDefault">
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