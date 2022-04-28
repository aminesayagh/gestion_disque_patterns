import Structure, { STRUCTURE } from "../structure/Structure";
import { SENCE_OF_HEAD } from '../strategies/types';
import CaseRendu, { ICaseRendu } from './CaseRendu';


export const listMethods = {
    generateSortList: function () {
        if (!this) throw new Error('this method is used as a weak coupling of class');
        // @ts-ignore
        try {
            const listSorted = [...this._listCases].sort((a, b) => a - b);
            this._listValuesSorted = new Structure<number>({ type: STRUCTURE.FILE });
            listSorted.map((value: number) => this._listValuesSorted.postCase = value);
        } catch (err) {
            console.log('error in list value sorted');
        }
    },
    sommeRendus: function () {
        if (!this) throw new Error('this method is used as weak coupling of class');
        return this._listValuesToCalcul.map((value) => {
            return value.absoluteDiffrenceCalcul()
        }).reduce((previousValue, currentValue) => previousValue + currentValue);
    },
    generateBeforeAfterOfHead: function (head: number) {
        if (!this) throw new Error('this method is used as weak coupling of class');
        let beforeHead: number = null;
        let afterHead: number = null;
        while (this._listValuesSorted.getSizeList && !afterHead) {
            const value = this._listValuesSorted.pullCase;
            if (value == head) {
                return { beforeHead, afterHead: this._listValuesSorted.pullCase };
            }
            if (value > head && !afterHead) afterHead = value;
            if (!afterHead) beforeHead = value;
        }
        return { beforeHead, afterHead };
    },
    renduOfSence: function (beforeHead, afterHead, sence, getHead ,setHead) {
        if (!this) throw new Error('this method is used as weak coupling of class');
        if(!this._listValuesSorted || !this._listValuesToCalcul) throw new Error('')
        const convertStructureBySence = {
            [SENCE_OF_HEAD.LEFT]: () => this._listValuesSorted.changeStructure = STRUCTURE.PILE,
            [SENCE_OF_HEAD.RIGHT]: () => this._listValuesSorted.changeStructure = STRUCTURE.FILE
        }
        let openCaseRendu = false;
        convertStructureBySence[sence]();

        while (this._listValuesSorted.getSizeList) {
            const value = this._listValuesSorted.pullCase;
            if ((value == beforeHead && sence == SENCE_OF_HEAD.LEFT) || (value == afterHead && sence == SENCE_OF_HEAD.RIGHT) || openCaseRendu) {
                openCaseRendu = true;
                this._listValuesToCalcul.push(new CaseRendu({ firstValue: getHead(), secondaryValue: value }));
                setHead(this._head);
            }
        }
    }
}