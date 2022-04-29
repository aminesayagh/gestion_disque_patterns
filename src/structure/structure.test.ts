import Structure, { STRUCTURE } from "./Structure";

const valuesToAdd = [1, 4, 2, 5, 7, 10];

describe("Test class of pile", () => {
  const pile = new Structure<number>({ type: STRUCTURE.PILE});
  describe("Pile constructor", () => {
    it("instanciation of pile", () => {
      const pileInstance = new Structure<number>({ type: STRUCTURE.PILE});
      expect(pileInstance instanceof Structure).toBeTruthy();
    });
  });
  describe("Test Pile Functionnality", () => {
    let lengthOfPile: number;
    it("Test to pill list", () => {
      valuesToAdd.map((value) => {
        pile.postCase = value;
      });
      lengthOfPile = pile.getSizeList;

      expect(pile.getSizeList).toEqual(valuesToAdd.length);
    });
    it("Test to pull case of pile", () => {
      const value = pile.pullCase;

      expect(value).toEqual(valuesToAdd[valuesToAdd.length - 1]);
    });
    it("last case imported does exist", () => {
      expect(lengthOfPile - 1).toEqual(pile.getSizeList);
    });
  });
});

describe("Test class of file", () => {
  const file = new Structure<number>({ type: STRUCTURE.FILE});
  describe("Pile constructor", () => {
    it("instanciation of file", () => {
      const fileInstance = new Structure<number>({ type: STRUCTURE.FILE});
      expect(fileInstance instanceof Structure).toBeTruthy();
    });
  });
  describe("Test File Functionnality", () => {
    let lengthOfPile: number;
    it("Test to fill list", () => {
      valuesToAdd.map((value) => {
        file.postCase = value;
      });
      lengthOfPile = file.getSizeList;

      expect(file.getSizeList).toEqual(valuesToAdd.length);
    });
    it("Test to pull case of file", () => {
      const value = file.pullCase;
      expect(value).toEqual(valuesToAdd[0]);
    });
    it("last case imported does exist", () => {
      expect(lengthOfPile - 1).toEqual(file.getSizeList);
    });
  });
});