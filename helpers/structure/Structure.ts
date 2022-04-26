
import { Memonto as ConcreteMemonto } from '../memonto/Memonto';
import type { IMemento } from '../memonto/Memonto';
import { Originator } from '../memonto/Originator';

interface IPile<TypeCase>{
    postCase: TypeCase;
    pullCase: TypeCase;
    getSizeList: number;
    initPile(): void;
}

export enum STRUCTURE {
    FILE= 'shift',
    PILE= 'pop'
}

// Pile or file
export default class Structure<TypeCase> implements IPile<TypeCase>, Originator<TypeCase>  {
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