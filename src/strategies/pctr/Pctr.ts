import File, { STRUCTURE, IStructure } from '../../structure/Structure';

import { ICaseRendu } from '../../lib/CaseRendu';

import CaratakerMemento from '../../memonto/Carataker';

import { listMethods } from '../../lib/listMethod';
import { SENCE_OF_HEAD } from '../types';

import Scan from '../scan/Scan';

export default class Pctr extends File<number>{
    private _generateListValueSorted: () => void;
    private _generateBeforeAfterOfHead: (head: number) => {beforeHead: number, afterHead: number };
    private _renduOfOneSence: (beforeHead, afterHead, sence, getHead, setHead) => void
    private _sommeRendus: () => number;
    private _changeSence: (sence: number) => SENCE_OF_HEAD

    private _head: number;
    public _listValuesToCalcul: Array<ICaseRendu>;
    public _listValuesSorted: IStructure<number>;

    constructor() {
        super({ type: STRUCTURE.FILE });
        this._listValuesToCalcul = new Array<ICaseRendu>();

        this._generateListValueSorted = listMethods.generateSortList;
        this._generateBeforeAfterOfHead = listMethods.generateBeforeAfterOfHead;
        this._sommeRendus = listMethods.sommeRendus;
        this._renduOfOneSence = listMethods.renduOfSence;
        this._changeSence = listMethods.changeSence;

        this._head = null;

    }
    set head(value: number) {
        this._head = value;
    }
    private identifySence() {
        const defineSence = (left, center, right) => {
            if (right - center == center - left) return null;
            return right - center > center - left ? SENCE_OF_HEAD.LEFT : SENCE_OF_HEAD.RIGHT;
        }
        const { beforeHead, afterHead } = this._generateBeforeAfterOfHead(this._head);
        const sence = defineSence(beforeHead, this._head, afterHead);
        return { beforeHead, afterHead, sence };
    }
    public calculRendu() {
        const actionWithSave = (action, caratackerMemontor) => {
            caratackerMemontor.backup();
            const result = action();
            caratackerMemontor.undo();
            return result;
        }

        // verification 
        if (!this._head) throw new Error('the head is not available');

        this._generateListValueSorted();
        const caratackerMemontor = new CaratakerMemento<IStructure<number>>(this._listValuesSorted);
        if (!this._listValuesSorted) throw new Error("error in list values");

        // sence values        
        let { beforeHead, afterHead, sence } = actionWithSave(() => {
            return this.identifySence()
        }, caratackerMemontor);
        // scam method
        if (!sence) {
            try{
                const scan = new Scan();
                while(this.getSizeList){
                    const value = this.pullCase;
                    scan.postCase = value;
                }
                const newHead= this._head;
                scan.head = newHead;
                return scan.calculRendu();
            }catch(err){
                console.log(err);
                return null;
            }
        }
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._head, (head) => {this._head = head}), caratackerMemontor);
        actionWithSave(() => sence = this._changeSence(sence), caratackerMemontor);
        actionWithSave(() => this._renduOfOneSence(beforeHead, afterHead, sence, () => this._head, (head) => {this._head = head}), caratackerMemontor);
        console.log('list case: ' ,this._listValuesToCalcul);


        return this._sommeRendus();
    }
}