interface transaction {
  date?: string;
  month?: number;
  transactionName?: string;
  cost?: number;
  balance?: number;
}

class Statementparser {

    static bofaParser = function (transactions: string[]): object[] {

        let processedTransactions:string[][] = Statementparser.bofaPreprocessor(transactions);
        let transactionObjects: object[] = [];

        processedTransactions.forEach((transaction)=>{
            let transactionObject: transaction = {
                date: String(transaction[0]),
                month: Number(String(transaction[0]).split('/')[0]),
                transactionName: transaction[1],
                cost: Number(transaction[2]),
                balance: Number(transaction[3])
            };
            transactionObjects.push(transactionObject);
        });

        return transactionObjects;
    };

    // Pretty imperative hehe
    static bofaPreprocessor = function (transactions: string[]): string[][] {

        let retList: string[] = transactions.map((transaction)=>{

            let toggler: boolean = false;
            let i = 0;

            while( i < transaction.length) {

                if (transaction[i] == '\"') {
                    
                    if(toggler) { toggler = false; }
                    else {toggler = true;}
                }

                if (toggler && transaction[i] === ',') {
                
                    transaction = transaction.substring(0, i) + transaction.substring(i+1, transaction.length);
                    
                }

                i+=1;
            }
            return transaction;

        });


        let filteredTransactions: string[][] = retList.map((transaction)=> {

            transaction = transaction.replaceAll('\"','');
            let details = transaction.split(',');
            return details;

        }).filter((details)=>{

            if (
            details.length === 4 &&
            details[0].match(/[0-9]{0,2}.{1}[0-9]{0,2}.{1}[0-9]{0,4}/) &&
            details[2].match(/^-?[0-9].*/) &&
            details[3].match(/^-?[0-9].*/) 
            ) {

                return details;

            } else {

                console.log(details + " was filtered out");

            }
        });

        console.log(filteredTransactions.length);

        return filteredTransactions;
        
    }
}

export {Statementparser};

/*
async function resultGen () {

    var par = document.getElementById("form-box");
    par.classList.add("removed");
  
    objGlob['reportType'] = document.getElementById("reportselect").value;
    objGlob['bank'] = document.getElementById("bankselect").value;
    objGlob['year'] = document.getElementById("year").value;
  
    await setTimeout(function() {
  
    changePage();
  
    lines = lines.slice(2,lines.length);
    lines.forEach(element => {
  
      let columns = element.split(/ {2,}/); 
      
      columns[0] = String(columns[0])
      let monthInt = Number(columns[0].split("/")[0]);
  
      columns[1] = String(columns[1])
      columns[2] = Number(String(columns[2]).replace(',',''));
      columns[3] = Number(String(columns[3]).replace(',',''));
      
      if (columns[1] && columns[2]) {
        let transaction = {
          monthNum : monthInt, 
          month: columns[0],
          company: columns[1],
          ammount: columns[2],
          balance: columns[3]
        }
        if (columns[2] < 0) {
          purchases.push(transaction);
        } else {
          payments.push(transaction);
        }
      }
    });
  
    let purchaseNums = [0,0,0,0,0,0,0,0,0,0,0,0];
    let paymentNums = [0,0,0,0,0,0,0,0,0,0,0,0];
  
    purchases.forEach((purchase) => {
      purchaseNums[purchase['monthNum']-1] -= purchase['ammount'];
    }); 
    payments.forEach((payment)=>{
      paymentNums[payment['monthNum']-1] += payment['ammount'];
    })
  
    MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12];
    console.log("checkpoint");
    Ymax = getYmax(purchaseNums, paymentNums);
  
    new eChart("Expenses",MONTHS,purchaseNums,"graph-box",'#fd6280', Ymax);
    new eChart("Income",MONTHS,paymentNums,"graph-box",'#47bfbd', Ymax);
  
  
   }, 700);
  
  };
  
  function getYmax(list1, list2){
  let max = 0
  list1.forEach((num)=>{if (num > max) {max = num;}});
  list2.forEach((num)=>{if (num > max) {max = num;}});
  
  let Ymax = Math.ceil(max);
  
  while (Ymax % 500 !== 0){
    Ymax+=1;
    console.log(Ymax);
  }
  return Ymax;
  }
  */