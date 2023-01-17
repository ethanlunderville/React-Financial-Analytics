class Datautility {

    static filterhandler = function (transactions: any, filterInPressed: any, filterOutPressed: any, nameInput: any,
        lessThanPressed: any, greaterThanPressed: any, quantityInput: any): object[] {

        console.log(transactions);
        console.log('filterInPressed: ',filterInPressed);
        console.log('filterOutPressed: ',filterOutPressed);
        console.log('nameInput: ',nameInput);
        console.log('lessThanPressed: ',lessThanPressed);
        console.log('greaterThanPressed: ',greaterThanPressed);
        console.log('quantityInput: ',quantityInput);

        let args = nameInput.split(" ");
        
        transactions.current.forEach((transaction: any)=>{
            
            args.forEach((arg: string)=>{
                if (arg.length > 0) {
                    if (filterInPressed && !transaction['transactionName'].match(new RegExp(".*"+arg+".*"))) {
                        transaction['visible'] = false;
                        //console.log(transaction['transactionName']);
                    } else if (filterOutPressed && transaction['transactionName'].match(new RegExp(".*"+arg+".*"))) {
                        transaction['visible'] = false;
                    }
                }
            })
        })

        let i = 0;
        transactions.current.forEach(()=>{
            if (transactions['visible'] === true){
                i+=1;
            }
        })
        console.log(i);
        return transactions.current
        

    }

    static getYmax = function(list1: number[], list2: number[]): number{

        let max = 0
        list1.forEach((num)=>{if (num > max) {max = num;}});
        list2.forEach((num)=>{if (num > max) {max = num;}});
        
        let Ymax: number = Math.ceil(max);
        
        while (Ymax % 500 !== 0){
          Ymax+=1;
        }
        
        return Ymax;
    }
}

export {Datautility};