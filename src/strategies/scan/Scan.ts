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
    private identifySence(headMemontor){
        if(!this._heads) throw new Error('Your need more of two head for use scam method');
        try{
            headMemontor.backup();
            const lastValue = this._heads.pullCase;
            const beforeValue = this._heads.getSizeList > 0 ? this._heads.pullCase : 0;
            headMemontor.undo();

            headMemontor.backup();
            const sence :SENCE_OF_HEAD =  lastValue > beforeValue ? SENCE_OF_HEAD.RIGHT : SENCE_OF_HEAD.LEFT;
            const { beforeHead, afterHead }= this._generateBeforeAfterOfHead(this._heads.pullCase)
            headMemontor.undo();
            
            return { beforeHead, afterHead, sence};
        }catch(err){
            console.log('error in identifySence at scan object ',err.message, this._heads);
            throw new Error(err);
        }

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
        const headMemontor = new CaratakerMemento<IStructure<number>>(this._heads);
        if (!this._listValuesSorted) throw new Error("error in list values");

        headMemontor.backup();
        let { beforeHead, afterHead, sence } = actionWithSave(() => {
            return this.identifySence(headMemontor);
        }, caratackerMemontor);
        headMemontor.undo();
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._heads.getLastCase(), (head) => this.head = head), caratackerMemontor);
        actionWithSave(() => sence = this._changeSence(sence), caratackerMemontor);
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._heads.getLastCase(), (head) => this._heads.postCase = head), caratackerMemontor);
        // console.log('list case: ' ,this._listValuesToCalcul);

        const result=  this._sommeRendus();
        return result;
    }
}