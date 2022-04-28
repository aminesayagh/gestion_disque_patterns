import Scan from './Scan';

const tests = [{values: [1, 4, 2, 5 ,7, 10], head: 5, result: 13}, {values: [1, 2, 4, 5, 7, 10], head: 3, result: null}, {values: [3, 2, 1, 20, 25, 4, 6], head: 10, result: 33}]

for(const test of tests) {
    describe(`scan test ${test.values}`, () => { 
        const scan = new Scan();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                scan.postCase = value;
            });
            expect(scan.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            scan.head = test.head;
            
            const rendu = scan.calculRendu();
            // expect(rendu).toEqual(test.result);
        })
     })
}