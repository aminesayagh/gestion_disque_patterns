import File, { STRUCTURE } from '../../structure/Structure';

export default class Fifo extends File<number>{
    _listSorted: number[];
    constructor(){
        super({ type:STRUCTURE.FILE });
        this._listCases = null;
        this._listSorted = null;

        this.generateOrdinaryList();
    }
    public generateOrdinaryList(){
        if(!this._listCases.length) throw new Error("Error in ording list, your list is empty");
        this._listSorted = this._listCases.sort();
    }
    public calculateRendu(){
        
    }
}