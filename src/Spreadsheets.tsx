import React, { useState, useEffect } from 'react'
import Transaction from './Transaction.js';


/** GOOD LUCK FIGURING THIS OUT (: */
function Spreadsheets({transactions}: any) {

    let [transactionList, setTransactionList] = useState(transactions.current);
    let [groups, setGroups] = useState([{}]);
    let [name, setName] = useState("");
    let [selectedIndexes, setSelectedIndexes] = useState([]);
    let [showAllTransactions, setShowAllTransactions] = useState(true);
    let [searchTerm, setSearchTerm] = useState("");

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
          }
        }

        console.log(groups);
        
        console.log("--------------------------------------");

        return groups

      })

    }

  return (
    <>
        <div id="spread-outer">  
          <div className="group-outer">
          <div id="left-button-grid">

          <div id="chooser-flex">
            
            { 
            showAllTransactions ? 
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser">Show all</div> :
              <div id="mytransactions" onClick={()=>setShowAllTransactions(true)} className="btn chooser chosen-button">Show all</div> 
            }
            { 
              showAllTransactions ?
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser chosen-button">Show selected</div>:
              <div id="mytransactions" onClick={()=>{ setShowAllTransactions(false) }} className="btn chooser">Show selected</div>
            }
            
          </div>

              <div id="right-button-grid">
                  <input type="text" 
                  id="input-group-maker"
                  value={searchTerm} 
                  onChange={(e)=>{
                    setSearchTerm(e.target.value)
                    setShowAllTransactions(false);
                  }}
                  placeholder="Transaction name"
                  />
                  <button 
                  id="create-button"
                  onClick={()=>setGroups([...groups, {
                      name: name,
                      id : groups.length - 1,
                      extended: true,
                      transactions: [{}]
                  }])}>
                    create group
                </button>
              </div>
              

              <div id="g-select">
                <label>Choose a group</label>
                {groups.map((group:any, index)=>{
                  return(<div onClick={()=>targetGroupLoader(group)} key={index}> {group['name']} </div>)
                })}
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
                 
                  return (  < Transaction key={transaction['id']} transaction={transaction} selectedTracker={selectedTracker} />  ) 
                    
              })
              }
            </div>

            <button 
              id="adder-button"
              onClick={(e)=>{

                
              }} >
            
                Add selected to group

              </button>
            </div>

          </div>

          <div className="group-outer">

            <div id="right-button-grid">
              <input type="text" 
              id="input-group-maker"
              value={name} 
              onChange={(e)=>setName(e.target.value)}
              placeholder="Group name"
              />
              <button 
              id="create-button"
              onClick={()=>setGroups([...groups, {
                  name: name,
                  id : groups.length - 1,
                  extended: true,
                  transactions: [{}]
              }])}>
                create group
            </button>
            </div>

            <div id="right-spread" className='spread-flex'>

                {groups.map((transactionGroup: any, index: any)=>{
                    if (index !== 0){
                    return (    
                                <div key={transactionGroup['id']} className="spread-group">
                                    <h1>{transactionGroup['name']}</h1>
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
                                                            }
                                                          })

                                                          console.log(groups);

                                                          return groups

                                                        })
                                                      }}>X</p>
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
        </div>
        </div>
    </>
  )
}

export default Spreadsheets