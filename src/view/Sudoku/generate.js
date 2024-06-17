// generate.js
import { solveSudoku, isValidMove } from './answer';

export function createPuzzle() {
  const board = Array(81).fill(0);
  solveSudoku(board);
  const solution = board.slice();
  const puzzle = board.slice();
  removeNumbers(puzzle);
  return { puzzle, solution };
}

function removeNumbers(puzzle) {
  let attempts = 5;
  while (attempts > 0) {
    const pos = Math.floor(Math.random() * 81);
    const backup = puzzle[pos];
    puzzle[pos] = 0;

    const copy = puzzle.slice();
    if (!isUniqueSolution(copy)) {
      puzzle[pos] = backup;
      attempts--;
    }
  }
}

function isUniqueSolution(board) {
  let count = 0;
  const solver = b => {
    if (count > 1) return;
    const emptyPos = b.indexOf(0);
    if (emptyPos === -1) {
      count++;
      return;
    }
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(b, emptyPos, num)) {
        b[emptyPos] = num;
        solver(b);
        b[emptyPos] = 0;
      }
    }
  };
  solver(board);
  return count === 1;
}
