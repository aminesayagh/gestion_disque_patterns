
import ConcreteMemonto from '../memonto/Memonto';
import type { IMemento } from '../memonto/Memonto';
import { Originator } from '../memonto/Originator';

export interface IStructure<TypeCase> extends Originator<TypeCase> {
    postCase: TypeCase;
    pullCase: TypeCase;
    getSizeList: number;
    changeStructure: STRUCTURE;
    initPile: () => void;
    getLastCase: () => TypeCase;
}

// @ts-ignore

export enum STRUCTURE {
    FILE= 'shift',
    PILE= 'pop',
}

// Pile or file
export default class Structure<TypeCase> implements IStructure<TypeCase>, Originator<TypeCase>  {
    _listCases: Array<TypeCase>;
    _type: STRUCTURE
    constructor({ type }: { type: STRUCTURE }){
        this._listCases = new Array<TypeCase>();
        this._type = type;
    }
    set postCase(newCase: TypeCase){
        this._listCases.push(newCase);
    }
    get pullCase(){
        const lastIn = this._listCases[this._type]();
        if(!lastIn) throw new Error("Pile Empty");
        console.log(this._listCases);
        return lastIn;
    }
    public get getSizeList(): number {
        return this._listCases.length
    }
    public initPile() {
        this._listCases = new Array<TypeCase>();
    }
    public save() {
        return new ConcreteMemonto<Array<TypeCase>>({...this._listCases});
    }
    public restore(memento: IMemento<Array<TypeCase>>) {
        const listCases = memento.getState();
        this.initPile();
        Object.entries(listCases).map(([ key, value]) => {
            this.postCase = value
        });
    }
    public getLastCase() {
        console.log( this._listCases[this.getSizeList - 1])
        return this._listCases[this.getSizeList - 1];
    }
    set changeStructure(value : STRUCTURE){
        this._type = value;
    }
}