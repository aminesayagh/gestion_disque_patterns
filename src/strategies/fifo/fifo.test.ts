import Fifo from './Fifo';

const tests = [{values: [1, 4, 2, 5 ,7, 10], head: 5, result: 17}, {values: [1, 2, 4, 5, 7, 10], head: 3, result: 11}, {values: [3, 2, 1, 20, 25, 4, 6], head: 10, result: 56}]

for(const test of tests) {
    describe(`fifo test ${test.values}`, () => { 
        const fifo = new Fifo();
        it("Test filling pill list", () => {
            test.values.map((value) => {
                fifo.postCase = value;
            });
            expect(fifo.getSizeList).toEqual(test.values.length);
        });
        it(`calcul rendu ${test.values}`, () => {
            fifo.head = test.head;
            const rendu = fifo.calculRendu();
            expect(rendu).toEqual(test.result);
        })
     })
}