import Pctr from './Pctr';

const tests = [{values: [1, 4, 2, 5 ,7, 10], head: 5, result: 13}, {values: [1, 2, 4, 5, 7, 10], head: 3, result: null}, {values: [3, 2, 1, 20, 25, 4, 6], head: 10, result: 33}]

for(const test of tests) {
    describe(`pctr test ${test.values}`, () => { 
        const pctr = new Pctr();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                pctr.postCase = value;
            });
            expect(pctr.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            pctr.head = test.head;
            const rendu = pctr.calculRendu();
            console.log(rendu);
            expect(rendu).toEqual(test.result);
        })
     })
}