const tests = [
  {
    name: "test 1",
    values: [1, 4, 2, 5, 7, 10],
    heads: [5],
    result: { scan: 14, pctr: 13, fifo: 17 },
  },
  {
    name: "test 2",
    values: [1, 2, 4, 5, 7, 10],
    heads: [3],
    result: { scan: 16, pctr: 16, fifo: 11 },
  },
  {
    name: "test 3",
    values: [3, 2, 1, 20, 25, 4, 6],
    heads: [9, 10],
    result: { scan: 39, pctr: 33, fifo: 56 },
  },
] as const;

export default tests;