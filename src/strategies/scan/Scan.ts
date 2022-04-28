import Structure, { STRUCTURE, IStructure } from '../../structure/Structure';
import { SENCE_OF_HEAD } from '../types';

import { listMethods } from '../../lib/listMethod';
import CaratakerMemento from '../../memonto/Carataker';


export default class Scan extends Structure<number> {
    private _generateListValueSorted: () => void;
    private _sommeRendus: () => number;
    private _generateBeforeAfterOfHead: (head: number) => {beforeHead: number, afterHead: number };

    private _heads: IStructure<number>;
    public _listValuesSorted: IStructure<number>;


    constructor(){
        super({ type: STRUCTURE.FILE });
        this._heads = new Structure<number>({ type: STRUCTURE.PILE });

        this._generateBeforeAfterOfHead = listMethods.generateBeforeAfterOfHead;
        this._generateListValueSorted = listMethods.generateSortList;
        this._sommeRendus = listMethods.sommeRendus;

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
        const convertStructureBySence = {
            [SENCE_OF_HEAD.LEFT]: () => this._listValuesSorted.changeStructure = STRUCTURE.PILE,
            [SENCE_OF_HEAD.RIGHT]: () => this._listValuesSorted.changeStructure = STRUCTURE.FILE
        }
        const actionWithSave = (action, caratackerMemontor) => {
            caratackerMemontor.backup();
            const result = action();
            caratackerMemontor.undo();
            return result;
        }

        this._generateListValueSorted();
        const caratackerMemontor = new CaratakerMemento<IStructure<number>>(this._listValuesSorted);
        if (!this._listValuesSorted) throw new Error("error in list values");

        const { beforeHead, ilafterHead, sence } = actionWithSave(() => {
            return this.identifySence();
        }, caratackerMemontor);
        


    }
}