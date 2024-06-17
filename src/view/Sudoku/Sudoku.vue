<template>
  <div class="container">
    <div id="sudoku-board">
      <div v-for="(value, index) in puzzle" :key="index" class="cell">
        <input
          v-model="userInput[index]"
          :disabled="value !== 0"
          :data-prefilled="value !== 0"
          maxlength="1"
          @input="handleInputChange($event, index)"
        />
      </div>
    </div>
    <div class="buttons">
      <button @click="generateSudoku">新的游戏</button>
      <button @click="showSolution">显示答案</button>
      <button @click="checkSolution">检查答案</button>
    </div>
  </div>
</template>

<script>
import { createPuzzle } from './generate';
import { isValidMove, solveSudoku } from './answer';

export default {
  data() {
    return {
      puzzle: [],
      solution: [],
      userInput: Array(81).fill('')
    };
  },
  created() {
    this.initializeBoard();
  },
  methods: {
    initializeBoard() {
      this.puzzle = Array(81).fill(0);
      this.userInput = Array(81).fill('');
    },
    handleInputChange(event, index) {
      const value = event.target.value;
      if (!/^[1-9]$/.test(value)) {
        this.$set(this.userInput, index, '');
      }
    },
    generateSudoku() {
      const { puzzle, solution } = createPuzzle();
      this.puzzle = puzzle;
      this.solution = solution;
      this.userInput = puzzle.map(value => (value !== 0 ? value : ''));
    },
    fillBoard(board) {
      this.puzzle = board;
      this.userInput = board.map(value => (value !== 0 ? value : ''));
    },
    showSolution() {
      this.fillBoard(this.solution);
    },
    checkSolution() {
      const board = this.userInput.map(value => parseInt(value) || 0);

      if (board.every((value, index) => value === this.solution[index])) {
        alert("恭喜！答案正确");
      } else {
        alert("答案有误，请再尝试");
      }
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#sudoku-board {
  display: grid;
  grid-template-columns: repeat(9, 40px);
  grid-template-rows: repeat(9, 40px);
  gap: 1px;
  margin-bottom: 20px;
}

.cell input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;
}

input[type="text"] {
  border: 1px solid #ddd;
}

input:focus {
  border: 2px solid #000;
}

input[data-prefilled="true"] {
  background-color: #eee;
}

.cell {
  position: relative;
  border: 1px solid #ddd;
}

.cell:nth-child(3n) {
  border-right: 2px solid #000;
}

.cell:nth-child(3n + 1) {
  border-left: 2px solid #000;
}

.cell:nth-child(-n + 9) {
  border-top: 2px solid #000;
}

.cell:nth-child(n + 73) {
  border-bottom: 2px solid #000;
}

.cell:nth-of-type(27n + 10),
.cell:nth-of-type(27n + 19),
.cell:nth-of-type(27n + 28) {
  border-bottom: 2px solid #000;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
