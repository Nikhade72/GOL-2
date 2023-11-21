// Importing necessary modules and styles
import { produce } from 'immer';
import React, { useCallback, useRef, useState } from 'react';
import style from './home.module.css';


// Constants for grid size
const numRows = 100;
const numCols = 100;

// Operations for calculating neighbors
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

// Function to generate an empty grid
const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0
        ))
    }
    return rows;
}

// Styles
const buttonStyle = {
    marginBottom: '10px',
};

// Constants for simulation interval and random cell probability

const SIMULATION_INTERVAL = 200;
const RANDOM_CELL_PROBABILITY = 0.7;

// Main component
const Home = () => {
    const [grid, setGrid] = useState(() => generateEmptyGrid());
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;
  
    const runSimulation = useCallback(() => {
      if (!runningRef.current) {
        return;
      }
  
      setGrid((g) =>
        produce(g, (gridCopy) => {
          for (let i = 0; i < numRows; i++) {
            for (let k = 0; k < numCols; k++) {
              let neighbors = 0;
              operations.forEach(([x, y]) => {
                const newI = i + x;
                const newK = k + y;
                if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                  neighbors += g[newI][newK];
                }
              });
  
              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][k] = 0;
              } else if (g[i][k] === 0 && neighbors === 3) {
                gridCopy[i][k] = 1;
              }
            }
          }
        })
      );
  
      setTimeout(runSimulation, SIMULATION_INTERVAL);
    }, []);
  
    const handleToggleSimulation = () => {
      setRunning(!running);
      if (!running) {
        runningRef.current = true;
        runSimulation();
      }
    };
  
    const handleRandomizeGrid = () => {
      const rows = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => (Math.random() > RANDOM_CELL_PROBABILITY ? 1 : 0))
      );
      setGrid(rows);
    };
  
    const handleClearGrid = () => {
      setGrid(generateEmptyGrid());
    };

    // New function to handle cell click
    const handleCellClick = (i, k) => {
      // Toggle the cell value when clicked
      setGrid((g) =>
          produce(g, (gridCopy) => {
              gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
          })
      );
  };
  

    return (
        <>
      <div>
        <h3>Game of Life</h3>
      </div>

      <button className={style['button-style']} onClick={handleToggleSimulation}>
        {running ? 'Stop' : 'Start'}
      </button>

      <button className={style['button-style']} onClick={handleRandomizeGrid}>
        Randomize
      </button>

      <button className={style['button-style']} onClick={handleClearGrid}>
        Clear
      </button>

      
       <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
            {grid.map((rows, i) =>
                rows.map((col, k) => (
                    <div
                        key={`${i}-${k}`}
                        onClick={() => handleCellClick(i, k)}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][k] ? 'gray' : undefined,
                            border: 'solid 1px black',
                        }}
                    />
                ))
            )}
        </div>
    </>

    )
}

export default Home