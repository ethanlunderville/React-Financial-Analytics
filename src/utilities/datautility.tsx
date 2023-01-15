class Datautility {

    static transactionCopier = function (transactions: object[]): object[] {

        let copiedTransactions: object[] = transactions.map((transaction)=>{
            return {...transaction, visible: true};
        });
        return copiedTransactions;

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