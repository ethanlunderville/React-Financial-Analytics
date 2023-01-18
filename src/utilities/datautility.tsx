class Datautility {

    static filterhandler = function (transactions: any, filterInPressed: any, filterOutPressed: any, nameInput: string,
        greaterThanInput: any, lessThanInput: any): object[] {

        console.log(transactions);
        console.log('filterInPressed: ',filterInPressed);
        console.log('filterOutPressed: ',filterOutPressed);
        console.log('nameInput: ',nameInput);
        console.log('lessThanInput: ',lessThanInput);
        console.log('greaterThanInput: ',greaterThanInput);

        let args: string[] = nameInput.split(',').map((e)=>{

            e = e.replace(',', '')

            let i = 0
            while (e[i] == " "){
                console.log(e);
                e = e.substring(0, i) + e.substring(i+1, e.length);
                console.log(e);
            }
            
            i=e.length-1
            while (e[i] == " "){
                e = e.substring(0, e.length-1);
                i=e.length - 1
            }

            return e.toUpperCase();

        });

        args.forEach(e=>{console.log(e)})
        
        transactions = Datautility.transactionReseterTrue(transactions);

        let lessThanNumber = Number(lessThanInput);
        let greaterThanNumber = Number(greaterThanInput);
        
        let ret = transactions.map((transaction: any)=>{

        if (greaterThanInput && transaction['cost'] <= greaterThanNumber) {
            transaction['visible'] = false;
            transaction['graphable'] = false;
            return transaction
        } 
        if (lessThanInput && transaction['cost'] >= lessThanNumber) {
            transaction['visible'] = false;
            transaction['graphable'] = false;
            return transaction
        }
        
        if ((filterInPressed || filterOutPressed) && args.length > 0) {

            let match = false;
            
            args.forEach((arg: string)=>{

                if(transaction['transactionName'].match(new RegExp(".*"+arg+".*"))){
                    match = true;
                }
            })
            if (filterInPressed && !match) {
                transaction['visible'] = false;
                transaction['graphable'] = false;
            } 
            if (filterOutPressed && match) {
                transaction['visible'] = false;
                transaction['graphable'] = false;
            }
        }

        return transaction
    })

        //IF THERE WAS A MATCH AND FILTERIN WAS SET, LEAVE IT AS TRUE
        //IF THERE WAS NO MATCH AND FILTER OUT WAS SET, LEAVE IT AS TRUE
        //IF THERE WAS A MATCH AND FILTEROUT WAS SET, SET TO FALSE
        //IF THERE WAS NO MATCH AND FILTER IN WAS SET, SET
        
        return ret

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

    static transactionReseterTrue = function(transactions: object[]): object[] {

        let ret = transactions.map((transaction: any)=>{
            transaction['visible'] = true;
            transaction['graphable'] = true;
            return transaction;
        });
        return ret;

    }

    static transactionReseterFalse = function(transactions: object[]): object[] {

        let ret = transactions.map((transaction: any)=>{
            transaction['visible'] = false;
            transaction['graphable'] = false;
            return transaction;
        });
        return ret;

    }

}

export {Datautility};