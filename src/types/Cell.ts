interface Cell {
  row: number;
  col: number;
  isCorrect: boolean;
  isIncorrect: boolean;
  isActive: boolean;
  positions: Array<number>;
}

export default Cell;
