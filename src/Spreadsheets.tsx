import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import Transaction from './Transaction.js';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// PLEASE REFRACTOR
function Spreadsheets({transactions}: any) {

    let [transactionList, setTransactionList] = useState(transactions.current);
    let [groups, setGroups] = useState([{}]);
    let [name, setName] = useState("");
    let [selectedIndexes, setSelectedIndexes] = useState<Array<Number>>([]);
    let [showAllTransactions, setShowAllTransactions] = useState(true);
    let [searchTerm, setSearchTerm] = useState("");
    let [limit, setLimit] = useState("");

    let [graphState, setGraphState] = useState(false);

    // Component refused to rerender when removing from selected indexes
    let [renderForce, setRenderForce] = useState(false);

    

    function selectedTracker(newIndex: number){

      setSelectedIndexes( (indexes: any) => {
        if (indexes.includes(Number(newIndex))) {
          
          const index = indexes.indexOf(newIndex);
          if (index > -1) { 
            indexes.splice(index, 1); 
          }
          console.log(indexes);
          return indexes;

        } else {
        
        indexes.push(newIndex);
        console.log("-------------");
          console.log(indexes);
        console.log("-------------");
        return indexes;

        }
      });

    }

    function targetGroupLoader(targetGroup: any) {

      let selectedTransactions = transactionList.filter((transaction: any)=>{
          
      let match: boolean = false

        for (let i = 0 ; i < selectedIndexes.length; i++) {
          if (transaction['id'] === selectedIndexes[i]){
              match = true
          }
        }

        if (match){
          
          setTransactionList((transactions: any)=>{
              let newTransactions = structuredClone(transactions)
              //console.log(newTransactions);
              for (let i = 0 ;i<newTransactions.length;i++) {
                if (newTransactions[i]['id'] === transaction['id']) {
                    newTransactions[i]['visible'] = false;
                }
              }
              return newTransactions
          })
          
          return transaction
        }

      })

      setSelectedIndexes([]);

      setGroups((lastGroups: any): object[]=>{        

        console.log("--------------------------------------");

        let groups = structuredClone(lastGroups);

        for(let i = 0 ; i< groups.length ; i++){

          if (lastGroups[i] === targetGroup) {

            groups[i]['transactions'] = [...groups[i]['transactions'], ...selectedTransactions]
            
            let transactionAmmounts = groups[i]['transactions'].map((transaction: any)=>{
              
                return transaction['cost']

            })

            groups[i]['actual'] = transactionAmmounts.reduce((total: number, amount: number) => total + amount); 
            
          }

        }

        console.log(groups);
        
        console.log("--------------------------------------");

        return groups

      })

    }

    /*
    let data = {
      datasets: [{
          data: groups.map((group: any)=>{return group['ammount']})
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: groups.map((group: any)=>{return group['name']})
  };*/

  const data = {
    labels: groups.map((transaction: any)=>{return transaction['name']}),
    datasets: [
      {
        label: '# of Votes',
        data: groups.map((transaction: any)=>{return transaction['actual']}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

    if (graphState){
      return (<div id="group-shower">
              <button 
                id="adder-button"
                className="fix-this"
                onClick={()=>{

                    setGraphState((state)=>!state);
                  
                }} >
              
                  Generate report
              </button>
        <Doughnut data={data} />
      </div>)
    }
    else {
  return (
    <>
        <div id="spread-outer">  
          <div className="group-outer">
          <div id="left-button-grid">
          <div className="spreadsheet-searchbar-flex">
        
          <div id="spread-filter-left">
            <div className="input-group">
                  <input id="transaction-filter-input"

                    type="text" className="form-control"
                    placeholder="Filter name" 
                    aria-label="Filter transactions" 
                    aria-describedby="basic-addon2"

                    value={searchTerm} 
                  onChange={(e)=>{
                    setSearchTerm(e.target.value)
                    setShowAllTransactions(false);
                  }}
                    
                  />
                  <div className="input-group-append">

                  </div>
            </div>
          </div>
          
        </div>


          <div id="chooser-flex">

          { 
            showAllTransactions ? 
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser">Show all</div> :
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser chosen-button">Show all</div> 
            }
            { 
              showAllTransactions ?
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser chosen-button">Show filtered</div>:
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser">Show selected</div>
            }
            
          </div>
              
            <div id="left-spread" className='spread-flex'>
              {
              transactionList.filter((t: any) => { 
                if (showAllTransactions) {
                if (t['visible']){
                return t
                }
                } else { 

                  if (t['visible'] && (t['transactionName'].match(new RegExp(".*"+searchTerm.toUpperCase()+".*")))) {
                    return t
                  }

                }
    
              }).map((transaction: any, index: any) => { 
                 
                 return (  /* < Transaction key={transaction['id']} transaction={transaction} selectedTracker={selectedTracker} />  */
                  
                  
                  <div key={transaction['id']} onClick={()=>{
                    selectedTracker(transaction['id'])
                    /*
                    setSelectedIndexes((indexes: Number[])=>{
                        if (selectedIndexes.includes(transaction['id'])){
                          const index = indexes.indexOf(transaction['id']);
                          if (index > -1) { 
                            indexes.splice(index, 1); 
                          }
                          return indexes
                        }
                        return [...indexes, transaction['id']]
                    })
                    */
                    //console.log(selectedIndexes);    
                    setRenderForce(e=>!e)
                    }
                    } className={ selectedIndexes.includes(transaction['id']) ? "transflex selected" : "transflex"}>
                                  <p>{transaction['date']}</p>
                                  <p>{transaction['transactionName']}</p>
                                  <p>{transaction['cost']}</p>
                    </div> 
                  
                  ) 
                    
              })
              }
            </div>

            <div id="selector-buttons" >
            <button 
              id="adder-button"
              onClick={()=>{

                  setSelectedIndexes(()=>{
                    if (showAllTransactions) {
                    return transactionList.map((transaction: any)=>{
                        return transaction['id']
                    }) 
                  } else {
                    return transactionList.filter((transaction: any)=>{
                        if (transaction['transactionName'].match(new RegExp(".*"+searchTerm.toUpperCase()+".*"))) {
                            return transaction
                        }
                    }).map((transaction: any)=>{return transaction['id']})
                  }
                  });
                
              }} >
            
                Select All

              </button>


              <button 
              id="adder-button"
              onClick={()=>{

                  setSelectedIndexes([]);
                
              }} >
            
                Deselect All

              </button>

              </div>

            
            </div>

          </div>

          <div className="group-outer">

            <div >


            <div className="spreadsheet-searchbar-flex">
              <div id="spread-filter-left">
                <div id="group-maker">
                    <input id="transaction-filter-input"

                      type="text" className="form-control"
                      placeholder="Group name"
                      aria-label="Filter transactions" 
                      aria-describedby="basic-addon2"

                      value={name} 
                      onChange={(e)=>setName(e.target.value)}

                      
                    />

                    <div id="cash-floater">
                    <div className="input-group-prepend">
                      <span className="input-group-text symbolic">$</span>
                    </div>

                    <input id="transaction-filter-input"

                    type="text" className="form-control"
                    placeholder="Group limit"
                    aria-label="Filter transactions" 
                    aria-describedby="basic-addon2"

                    value={limit} 
                    onChange={(e)=>{
                      
                      setLimit(e.target.value)
                      
                    }}
                    />
                    </div>

                    <button 
                      id="create-button"
                      onClick={()=>setGroups([...groups, {
                          name: name,
                          limit: Number(limit),
                          actual: 0,
                          id : groups.length - 1,
                          extended: true,
                          transactions: []
                      }])}>
                        create group
                    </button>
                    
                </div>
              </div>
            </div>
              
            </div>

            <div id="right-spread" className='spread-flex'>

                {groups.map((transactionGroup: any, index: any)=>{
                    if (index !== 0){
                    return (    
                                <div onClick={()=>targetGroupLoader(transactionGroup)} key={transactionGroup['id']} className="spread-group">



                                  <div id="group-display">

                                    
                                    <h2> <span onClick={()=>{
                                      setGroups((groups: any)=>{
                                        return groups.map((group: any)=>{
                                          if (group === transactionGroup) {

                                            if(group['extended']){
                                            group['extended'] = false 
                                            } else {

                                              group['extended'] = true 

                                            }
                                            return group;
                                          }
                                          return group
                                        })
                                      });
                                    }}> &gt; </span> {transactionGroup['name']}</h2>
                                    
                                    <div>
                                    <h3>Limit: ${transactionGroup['limit'].toFixed(2)}</h3>
                                    <h3>Actual: ${transactionGroup['actual'].toFixed(2)}</h3>
                                    </div>

                                    <div id="group-delete">

                                    <h1 onClick={()=>{

                                        setTransactionList((transactions: any)=>{
                                           let transactionsIndexes: any = []

                                           transactionGroup['transactions'].forEach((transaction: any)=>{

                                              transactionsIndexes = [...transactionsIndexes, transaction['id']]

                                           })

                                           let updatedTransactions = transactions.map((transaction: any)=>{
                                              if(transactionsIndexes.includes(transaction['id'])) {
                                                 return {...transaction, visible : true}
                                              }
                                              return transaction
                                           })

                                           return updatedTransactions

                                        })
                                        setGroups((groups)=>{

                                            return groups.filter((group: any) => {
                                                if (group['id'] !== transactionGroup['id']) {
                                                    return group
                                                }
                                            })

                                        })
                                       
                                    }}>-</h1>
                                    </div>


                                  </div>

                                    <div className="spread-transactions-flex">
                                        {transactionGroup['extended'] &&  
                                            transactionGroup['transactions'].map((transaction: any)=>{
                                        
                                                return (
                                                    <div key={transaction['id']} className="transflex">
                                                      <p>{transaction['date']}</p>
                                                      <p>{transaction['transactionName']}</p>
                                                      <p>{transaction['cost']}</p>
                                                      <p onClick={()=>{
                                                        setGroups((oldGroups: any)=>{

                                                          // DEEP COPY TO AVOID RERENDERING WHILE EDITING IN PLACE
                                                          let groups = structuredClone(oldGroups)
                                                          
                                                          groups.forEach((group: any)=>{

                                                            if (group['id'] === transactionGroup['id']){
                                                              //console.log("Here is the group id: "+ group['id']);
                                                              //console.log("transactions before : " + group)
                                                              group['transactions'] = group['transactions'].filter((transactionFor: any)=>{
                                                                    if ( transactionFor['id'] !== transaction['id'] ) {
                                                                      console.log(transactionFor);
                                                                      
                                                                      return transaction
                                                                      
                                                                    } else {

                                                                      //console.log(transactionFor);
                                                                      setTransactionList((transactions: any)=>{

                                                                        let h = transactions.map((transactioninner: any)=>{
                                                                            if (transactioninner['id'] === transaction['id']) {
                                                                              transactioninner['visible'] = true
                                                                            }
                                                                            return transactioninner                                                                 
                                                                        })

                                                                        return h;

                                                                      })
                                                                      //console.log(transactionFor);
                                                                      //console.log("a transaction was filtered");
                                                                    }
                                                              })

                                                              group['actual'] = group['transactions']
                                                              .map((transaction: any)=>{return transaction['cost']})
                                                              .reduce((base: number, accumulator:number)=>{
                                                                  return base + accumulator
                                                                })
                                                              

                                                              console.log(groups);
                                                              

                                                            }
                                                          })

                                                          return groups

                                                        })
                                                      }
                                                      
                                                      }>X</p>
                                                    </div>
                                                  )
                                            })
                                        }
                                    </div>
                                </div>
                                )
                            }
                         } )
                }
          </div>

              
          <button 
              id="adder-button"
              className="fix-this"
              onClick={()=>{

                  setGraphState((state)=>!state);
                
              }} >
            
                Generate report

              </button>
                      
        </div>
      </div>
    </>
  )
}
}

export default Spreadsheets