import Fifo from './Fifo';

import dataTest from '../../../dataTest';

for(const test of dataTest) {
    describe(`fifo test ${test.values}`, () => { 
        const fifo = new Fifo();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                fifo.postCase = value;
            });
            expect(fifo.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            test.heads.map((head) => fifo.head = head);
            
            const rendu = fifo.calculRendu();
            expect(rendu).toEqual(test.result.fifo);
        })
     })
}