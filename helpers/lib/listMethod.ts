import Structure, { STRUCTURE } from "../structure/Structure";

export const listMethods = {
    generateSortList: function(){
        if(!this) throw new Error('this method is used as a weak coupling of class');
        // @ts-ignore
        try{
            const listSorted = [...this._listCases].sort((a, b) => a - b);
            this._listValuesSorted = new Structure<number>({ type: STRUCTURE.FILE });
            listSorted.map((value: number) => this._listValuesSorted.postCase = value);
        }catch(err){
            console.log('error in list value sorted');
        }
    },
    sommeRendus: function(){
        if(!this) throw new Error('this method is used as weak coupling of class');
        console.log('fin generate rendu');;
        console.log('rendu', this._listValuesToCalcul);
        return this._listValuesToCalcul.map((value) => {
            return value.absoluteDiffrenceCalcul()
        }).reduce(( previousValue, currentValue ) => previousValue + currentValue);
    }
}