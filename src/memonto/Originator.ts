
import { IMemento } from './Memonto';

export interface Originator<TypeCase> {
    save: () => IMemento<Array<TypeCase>>
    restore: (lastState: IMemento<Array<TypeCase>>) => void 
}