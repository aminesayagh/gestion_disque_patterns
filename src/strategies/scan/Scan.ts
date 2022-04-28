import Structure, { STRUCTURE, IStructure } from '../../structure/Structure';
import { SENCE_OF_HEAD } from '../types';

import { listMethods } from '../../lib/listMethod';
import CaratakerMemento from '../../memonto/Carataker';

import { ICaseRendu } from '../../lib/CaseRendu';

export default class Scan extends Structure<number> {
    private _generateListValueSorted: () => void;
    private _sommeRendus: () => number;
    private _generateBeforeAfterOfHead: (head: number) => {beforeHead: number, afterHead: number };
    private _renduOfOneSence: (beforeHead, afterHead, sence, getHead, setHead) => void
    private _changeSence: (sence: number) => SENCE_OF_HEAD
    public _listValuesToCalcul: Array<ICaseRendu>;


    private _heads: IStructure<number>;
    public _listValuesSorted: IStructure<number>;


    constructor(){
        super({ type: STRUCTURE.FILE });
        this._heads = new Structure<number>({ type: STRUCTURE.PILE });
        this._listValuesToCalcul = new Array<ICaseRendu>();


        this._generateBeforeAfterOfHead = listMethods.generateBeforeAfterOfHead;
        this._generateListValueSorted = listMethods.generateSortList;
        this._sommeRendus = listMethods.sommeRendus;
        this._renduOfOneSence = listMethods.renduOfSence;
        this._changeSence = listMethods.changeSence;


    }
    set head(value: number){
        this._heads.postCase = value;
    }
    private identifySence(){
        if(!this._heads) throw new Error('Your need more of two head for use scam method');
        const headsSave = this._heads.save();
        const lastValue = this._heads.pullCase;
        const beforeValue = this._heads.getSizeList ? this._heads.pullCase : 0;
        const sence :SENCE_OF_HEAD =  lastValue > beforeValue ? SENCE_OF_HEAD.RIGHT : SENCE_OF_HEAD.LEFT;
        this._heads.restore(headsSave);
        const { beforeHead, afterHead }= this._generateBeforeAfterOfHead(this._heads.pullCase)
        return { beforeHead, afterHead, sence};
    }
    public calculRendu(){
        const actionWithSave = (action, caratackerMemontor) => {
            caratackerMemontor.backup();
            const result = action();
            caratackerMemontor.undo();
            return result;
        }

        this._generateListValueSorted();
        const caratackerMemontor = new CaratakerMemento<IStructure<number>>(this._listValuesSorted);
        if (!this._listValuesSorted) throw new Error("error in list values");

        let { beforeHead, afterHead, sence } = actionWithSave(() => {
            return this.identifySence();
        }, caratackerMemontor);
        
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._heads.getCaseByIndex(0), (head) => this._heads.postCase = head), caratackerMemontor);
        actionWithSave(() => sence = this._changeSence(sence), caratackerMemontor);
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._heads.getCaseByIndex(0), (head) => this._heads.postCase = head), caratackerMemontor);
        const result=  this._sommeRendus();
        console.log(result);
        return result;
    }
}