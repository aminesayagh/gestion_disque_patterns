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