import File, { STRUCTURE } from '../../structure/Structure';

export const listMethods = {
    generateOrdinaryList: () => {
        if(!this) throw new Error('this method is used as a weak coupling');
        // @ts-ignore
        this._listSorted = [...this._listCases].sort();
    }
}

type TypeCase = number;

export default class Fifo extends File<number>{
    public _listCases: TypeCase[];
    _listSorted: TypeCase[];
    private _head: TypeCase;
    private _listValuesToCalcul;

    private generateOrdinaryList;

    constructor(){
        super({ type:STRUCTURE.FILE });
        this._listCases = null;
        this._listSorted = null;
        this.generateOrdinaryList = listMethods.generateOrdinaryList;

        this.generateOrdinaryList();
    }
    set head(value: TypeCase){
        this._head = value;
    }
    public calculateRendu(){
        this._listValuesToCalcul = new File<{ firstValue: TypeCase, secondaryValue: TypeCase }>({ type: STRUCTURE.FILE });
        
        this._listValuesToCalcul.postCase({ firstValue: this._head, secondaryValue: this.pullCase });
    }
}