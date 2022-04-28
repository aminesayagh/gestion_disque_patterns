// import File, { STRUCTURE, IStructure } from '../../structure/Structure';

// export default class Scan extends File<number> {
//     private _generateListValueSorted: () => void;
//     private _sommeRendus: () => number;
//     private _heads: IStructure<number>;

//     constructor(){
//         super({ type: STRUCTURE.FILE });
//         this._heads = new File<number>({ type: STRUCTURE.PILE });
//     }
//     set head(value: number){
//         this._heads.postCase = value;
//     }
//     identifySence(){
//         const headsSave = this._heads.save();
        
//         // const actualyHead = this._heads.pullCase();

//     }
// }