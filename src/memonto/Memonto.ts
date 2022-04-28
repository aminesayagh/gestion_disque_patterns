/**
 * PATTERN MEMONTO
 * https://refactoring.guru/fr/design-patterns/memento
 */

export interface IMemento<TypeState> {
    getState(): TypeState;
}
export default class Memonto<TypeState> implements IMemento<TypeState> {
    state: TypeState;
    constructor(state: TypeState){
        this.state = state;
    }
    public getState(): TypeState {
        return this.state;
    }
}