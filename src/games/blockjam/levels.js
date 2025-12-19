
export const LEVELS = [
  {
    id: "L1",
    rows: 6,
    cols: 6,
    moveLimit: 20,
    tiles: [
      { id: "r1", color: "#E74C3C", pos: { row: 1, col: 1 }, goal: { row: 1, col: 4 } },
      { id: "b1", color: "#3498DB", pos: { row: 4, col: 1 }, goal: { row: 4, col: 5 } },
      { id: "blk1", color: "#7F8C8D", pos: { row: 2, col: 2 }, locked: true },
      { id: "blk2", color: "#7F8C8D", pos: { row: 3, col: 3 }, locked: true }
    ]
  },
  {
    id: "L2",
    rows: 7,
    cols: 6,
    moveLimit: 18,
    tiles: [
      { id: "g1", color: "#27AE60", pos: { row: 2, col: 1 }, goal: { row: 2, col: 5 } },
      { id: "y1", color: "#F1C40F", pos: { row: 5, col: 4 }, goal: { row: 5, col: 1 } },
      { id: "blk1", color: "#7F8C8D", pos: { row: 1, col: 3 }, locked: true },
      { id: "blk2", color: "#7F8C8D", pos: { row: 4, col: 3 }, locked: true },
      { id: "blk3", color: "#7F8C8D", pos: { row: 6, col: 2 }, locked: true }
    ]
  }
];
