
import { IMemento } from './Memonto';

export default class Carataker<TypeOriginator>{
    private mementos: IMemento<TypeOriginator>[] = new Array<IMemento<TypeOriginator>>();

    private originator : TypeOriginator;

    constructor(originator: TypeOriginator){
        this.originator = originator;
    }

    public backup(): void {
        // console.log('new Backup ...');
        // @ts-ignore
        this.mementos.push(this.originator.save());
    }
    public undo(): void{
        if(!this.mementos.length) throw new Error('your memento patterns empty');
        const memento = this.mementos.pop();

        // console.log("Carataker Restoring state");
        // @ts-ignore
        this.originator.restore(memento);
    }
    public showHistory(): void {
        console.log('Carataker history state');
        this.mementos.map((memento, index) => console.log(`v${index}`,memento))
    }
}