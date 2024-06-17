// answer.js
export function solveSudoku(board) {
    const emptyPos = board.indexOf(0);
    if (emptyPos === -1) return true;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, emptyPos, num)) {
        board[emptyPos] = num;
        if (solveSudoku(board)) return true;
        board[emptyPos] = 0;
      }
    }
    return false;
  }
  
  export function isValidMove(board, pos, num) {
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
  
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num) return false;
      if (board[i * 9 + col] === num) return false;
      const boxIndex = boxRow * 9 + boxCol + Math.floor(i / 3) * 9 + (i % 3);
      if (board[boxIndex] === num) return false;
    }
    return true;
  }
  