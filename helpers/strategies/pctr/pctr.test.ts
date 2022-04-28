import Pctr from './Pctr';

const valuesToAdd = [1, 4, 2, 5, 7, 10];
const head = 5;

describe('pctr test', () => { 
    const pctr = new Pctr();
    let lengthOfPile: number;

    it("Test to pill list", () => {
        valuesToAdd.map((value) => {
            pctr.postCase = value;
        });
        lengthOfPile = pctr.getSizeList;
  
        expect(pctr.getSizeList).toEqual(valuesToAdd.length);
    });
    it('calcul  rendu', () => {
        pctr.head = head;
        const rendu = pctr.calculRendu();
        console.log(rendu);
    })
 })