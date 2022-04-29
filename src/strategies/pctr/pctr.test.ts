import Pctr from './Pctr';

import dataTest from '../../../dataTest';


for (const test of dataTest) {
    describe(`pctr test ${test.values}`, () => {
        const pctr = new Pctr();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                pctr.postCase = value;
            });
            expect(pctr.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            test.heads.map((head) => pctr.head = head);
            
            const rendu = pctr.calculRendu();
            expect(rendu).toEqual(test.result.pctr);
        })
    })
}