/**
 * PATTERN MEMONTO
 * https://refactoring.guru/fr/design-patterns/memento
 */

export interface IMemento<TypeState> {
    getState(): TypeState;
}

export class Memonto<TypeState> implements IMemento<TypeState> {
    _state: TypeState;
    constructor(state: TypeState){
        this._state = state;
    }
    public getState(): TypeState {
        return this._state;
    }
}


export default class Carataker<TypeOriginator>{
    private _mementos: IMemento<TypeOriginator>[] = new Array();

    private _originator : TypeOriginator;

    constructor(originator: TypeOriginator){
        this._originator = originator;
    }

    public backup(): void {
        console.log('new Backup ...');
        // ts-ignore
        this._mementos.push(this._originator.save());
    }
    public undo(): void {
        if(!this._mementos.length) return;
        const memento = this._mementos.pop();

        console.log("Carataker Restoring state");
        // ts-ignore
        this._originator.restore(memento);
    }
}

