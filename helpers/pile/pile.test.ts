import Pile from "./Pile";

const valuesToAdd = [1, 4, 2, 5, 7, 10];

describe("Test class of pile", () => {
  const pile = new Pile();
  describe("Pile constructor", () => {
    it("instanciation of pile", () => {
      const pileInstance = new Pile();
      expect(pileInstance instanceof Pile).toBeTruthy();
    });
  });
  describe("Test Pile Functionnality", () => {
    let lengthOfPile: number;
    beforeAll(() => {
      lengthOfPile = pile.getSizeList;
    });
    it("Test to fill list", () => {
      valuesToAdd.map((value) => {
        pile.postCase = value;
      });
      expect(pile.getSizeList == valuesToAdd.length).toBeTruthy();
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
