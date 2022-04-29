import File, { STRUCTURE } from '../../structure/Structure';

import CaseRendu, { ICaseRendu } from '../../lib/CaseRendu';

import { listMethods } from '../../lib/listMethod';

export default class Fifo extends File<number>{
    private _head: number;
    private _listValuesToCalcul: Array<ICaseRendu>;
    private _sommeRendus: () => number;


    constructor(){
        super({ type:STRUCTURE.FILE });
        this._listValuesToCalcul = new Array<ICaseRendu>();
        this._sommeRendus = listMethods.sommeRendus;

    }
    set head(value: number){
        this._head = value;
    }
    public calculRendu(){
        while(this.getSizeList){
            const firstCaseInFile = this.pullCase;
            this._listValuesToCalcul.push(new CaseRendu({ firstValue: this._head, secondaryValue: firstCaseInFile }));
            this._head = firstCaseInFile;
        }
        // console.log('list case: ' ,this._listValuesToCalcul);

        return this._sommeRendus();
    }
}