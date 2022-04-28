export interface ICaseRendu {
    absoluteDiffrenceCalcul:() => number;
}
export default class CaseRendu implements ICaseRendu{
    private _firstValue: number;
    private _secondaryValue: number;
    constructor({ firstValue, secondaryValue }: { firstValue: number, secondaryValue: number}){
        this._firstValue = firstValue;
        this._secondaryValue = secondaryValue;
    }
    absoluteDiffrenceCalcul() {
        return Math.abs(this._firstValue - this._secondaryValue);
    }
}