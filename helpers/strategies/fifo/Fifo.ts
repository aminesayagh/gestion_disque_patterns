import File, { STRUCTURE } from '../../structure/Structure';

export const listMethods = {
    generateOrdinaryList: () => {
        if(!this) throw new Error('this method is used as a weak coupling');
        // @ts-ignore
        this._listSorted = [...this._listCases].sort();
    }
} 
export default class Fifo extends File<number>{
    public _listCases: number[];
    _listSorted: number[];
    private generateOrdinaryList;
    constructor(){
        super({ type:STRUCTURE.FILE });
        this._listCases = null;
        this._listSorted = null;
        this.generateOrdinaryList = listMethods.generateOrdinaryList;
        this.generateOrdinaryList();
    }
    
    public calculateRendu(){
        
    }
}