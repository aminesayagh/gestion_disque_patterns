import Scan from './Scan';

import dataTest from '../../../dataTest';

for (const test of dataTest) {
    describe(`scan test ${test.values}`, () => {
        const scan = new Scan();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                scan.postCase = value;
            });
            expect(scan.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            test.heads.map((head) => scan.head = head);

            const rendu = scan.calculRendu();
            expect(rendu).toEqual(test.result.scan);
        })
    })
}