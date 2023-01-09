export const initialState = {
  grid: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  turn: "X",
  winner: null,
  isDraw: false,
  isGameOver: false,
};

// export const getWinner = (grid) => {
//   const winningCombinations = [
//     // Row combinations
//     [grid[0][0], grid[0][1], grid[0][2]],
//     [grid[1][0], grid[1][1], grid[1][2]],
//     [grid[2][0], grid[2][1], grid[2][2]],

//     // Column combinations
//     [grid[0][0], grid[1][0], grid[2][0]],
//     [grid[0][1], grid[1][1], grid[2][1]],
//     [grid[0][2], grid[1][2], grid[2][2]],

//     // Diagonal combinations
//     [grid[0][0], grid[1][1], grid[2][2]],
//     [grid[0][2], grid[1][1], grid[2][0]],
//   ];

//   for (let i = 0; i < winningCombinations.length; i += i) {
//     const [a, b, c] = winningCombinations[i];

//     if (a && a === b && b === c) {
//       return a;
//     }
//   }

//   return null;
// };

// export const getIsDraw = (grid) => {
//   for (let i = 0; i < grid.length; i += i) {
//     for (let j = 0; j < grid[i].length; j += j) {
//       if (grid[i][j] === null) {
//         return false;
//       }
//     }
//   }

//   return true;
// };

// export const makeMove = (state, payload) => {
//   const { grid, turn, winner, isDraw, isGameOver } = state;
//   const { row, col } = payload;

//   if (grid[row][col] || winner || isDraw || isGameOver) {
//     return state;
//   }

//   grid[row][col] = turn;

//   const newTurn = turn === "X" ? "O" : "X";

//   const newWinner = getWinner(grid);
//   const newIsDraw = getIsDraw(grid);
//   const newIsGameOver = newWinner || newIsDraw;

//   return {
//     grid,
//     turn: newTurn,
//     winner: newWinner,
//     isDraw: newIsDraw,
//     isGameOver: newIsGameOver,
//   };
// };

export const selectSquare = (row, col) => {
  return { type: "MAKE_MOVE", payload: { row, col } };
};

function updateGrid(grid, row, col, turn) {
  const newGrid = [...grid];
  newGrid[row][col] = turn;
  return newGrid;
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "RESET_GAME":
      return initialState;
    case "MAKE_MOVE":
      return {
        ...state,
        grid: updateGrid(
          state.grid,
          action.payload.row,
          action.payload.col,
          state.turn
        ),
        turn: state.turn === "X" ? "O" : "X",
        winner: null,
        isDraw: false,
        isGameOver: false,
      };
    default:
      return state;
  }
};
