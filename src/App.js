import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Input } from "./styledComponents/checkbox";
import { Center } from "./styledComponents/center";
import { Flex } from "./styledComponents/flex";

function App() {
  const rows = 12;
  const columns = 12;
  const cellSize = 40;

  const canvasWidth = columns * cellSize;
  const canvasHeight = rows * cellSize;

  const [pixelGrid, setPixelGrid] = useState(
    Array(rows * columns).fill("white")
  );

  const [hideGrid, setHideGrid] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the grid and colored dots
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const dotIndex = rowIndex * columns + columnIndex;
        const dotColor = pixelGrid[dotIndex];

        // Draw the grid cell
        ctx.strokeStyle = "black";
        if (!hideGrid)
          ctx.strokeRect(
            columnIndex * cellSize,
            rowIndex * cellSize,
            cellSize,
            cellSize
          );

        // Draw the colored dot
        ctx.fillStyle = dotColor;
        ctx.fillRect(
          columnIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }, [pixelGrid, hideGrid]);

  const handleColorize = (index) => {
    setPixelGrid((grid) => {
      const colors = [...grid];
      colors[index] = "blue";
      return colors;
    });
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const columnIndex = Math.floor((e.clientX - rect.left) / cellSize);
    const rowIndex = Math.floor((e.clientY - rect.top) / cellSize);

    const dotIndex = rowIndex * columns + columnIndex;

    handleColorize(dotIndex);
  };

  return (
    <Center>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleClick}
      ></canvas>
      <Flex>
        <Input
          type="checkbox"
          onClick={() => setHideGrid((hide) => !hide)}
          checked={hideGrid}
          id="hideGrid"
        />
        <label for="hideGrid">Hide grid</label>
      </Flex>
    </Center>
  );
}

export default App;
