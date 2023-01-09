import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([
    {
      name: "",
      score: 0,
    },
    {
      name: "",
      score: 0,
    },
  ]);

  const [grid, setGrid] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [draw, setDraw] = useState(false);

  const playWhoStart = () => {
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      setTurn("X");
    } else {
      setTurn("O");
    }
  };

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i += 1) {
      if (
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2] &&
        grid[i][0] !== null
      ) {
        setWinner(grid[i][0]);
        setGameOver(true);
      }
    }

    // Check columns
    for (let i = 0; i < 3; i += 1) {
      if (
        grid[0][i] === grid[1][i] &&
        grid[1][i] === grid[2][i] &&
        grid[0][i] !== null
      ) {
        setWinner(grid[0][i]);
        setGameOver(true);
      }
    }

    // Check diagonals
    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[0][0] !== null
    ) {
      setWinner(grid[0][0]);
      setGameOver(true);
    }

    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[0][2] !== null
    ) {
      setWinner(grid[0][2]);
      setGameOver(true);
    }
  };

  const checkDraw = () => {
    if (!winner) {
      let drawBool = true;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          if (grid[i][j] === null) {
            drawBool = false;
          }
        }
      }
      if (drawBool) {
        setDraw(true);
        setGameOver(true);
      }
    }
  };

  const handleClick = (rowCoord, colCoord) => {
    if (grid[rowCoord][colCoord] === null && !gameOver) {
      const newGrid = [...grid];
      newGrid[rowCoord][colCoord] = turn;
      setGrid(newGrid);

      if (turn === "X") {
        setTurn("O");
      } else {
        setTurn("X");
      }
    }
  };

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [grid]);

  useEffect(() => {
    playWhoStart();
  }, []);

  if (winner) {
    console.warn(`${winner} wins!`);
  } else if (draw) {
    console.warn("Draw!");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      {/* input for player name */}
      <section className="mb-10">
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center">
            <input
              type="text"
              className="h-10 w-36 border-2 border-black rounded-lg px-2"
              placeholder="Player 1"
              value={players[0].name}
              onChange={(e) => {
                const newPlayers = [...players];
                newPlayers[0].name = e.target.value;
                setPlayers(newPlayers);
              }}
            />
            <button type="button">
              <img
                src="https://img.icons8.com/ios/50/000000/plus.png"
                alt="plus"
                className="h-10 w-10"
              />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="h-10 w-36 border-2 border-black rounded-lg px-2"
              placeholder="Player 2"
              value={players[1].name}
              onChange={(e) => {
                const newPlayers = [...players];
                newPlayers[1].name = e.target.value;
                setPlayers(newPlayers);
              }}
            />
            <button type="button">
              <img
                src="https://img.icons8.com/ios/50/000000/plus.png"
                alt="plus"
                className="h-10 w-10"
              />
            </button>
          </div>
        </div>
      </section>
      <div className="h-96 w-96 bg-black rounded-lg shadow-lg grid grid-rows-3 grid-cols-3 gap-4 p-4">
        {grid.map((rows, rowCoord) =>
          rows.map((square, colCoord) => (
            <button
              type="button"
              className="h-28 w-28 bg-white rounded-lg flex justify-center items-center text-5xl font-bold cursor-pointer"
              onClick={() =>
                gameOver ? null : handleClick(rowCoord, colCoord)
              }
            >
              {square}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
