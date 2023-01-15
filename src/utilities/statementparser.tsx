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