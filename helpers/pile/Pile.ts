interface ListCase {
    value: number
}

import { Memonto as ConcreteMemonto } from '../memonto/Memonto';
import type { IMemento } from '../memonto/Memonto';


interface IPile<TypeCase>{
    postCase: TypeCase;
    pullCase: TypeCase;
    getSizeList: number;
    initPile(): void;
}


export interface Originator<TypeCase> {
    save(): IMemento<Array<TypeCase>>
    restore(lastState: IMemento<Array<TypeCase>>): void 
}



export default class Pile<TypeCase> implements IPile<TypeCase>, Originator<TypeCase>  {
    private _listCases: Array<TypeCase>;
    constructor(){
        this._listCases = new Array<TypeCase>();
    }
    set postCase(newCase: TypeCase){
        this._listCases.push(newCase);
    }
    get pullCase(){
        const lastIn = this._listCases.pop();
        if(!lastIn) throw new Error("Pile Empty");
        return lastIn;
    }
    get getSizeList() {
        return this._listCases.length
    }
    public initPile() {
        this._listCases = new Array<TypeCase>();
    }
    public save() {
        return new ConcreteMemonto<Array<TypeCase>>(this._listCases);
    }
    public restore(memento: IMemento<Array<TypeCase>>) {
        this._listCases = memento.getState();
    }
}