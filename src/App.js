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

  const [isDrawing, setIsDrawing] = useState(false);

  const [pixelGrid, setPixelGrid] = useState(
    Array(rows * columns).fill("white")
  );

  const [hideGrid, setHideGrid] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the grid and colored dots
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const pixelIndex = rowIndex * columns + columnIndex;
        const dotColor = pixelGrid[pixelIndex];

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
  }, [pixelGrid, isDrawing, hideGrid]);

  useEffect(() => {
    console.log(isDrawing);
  }, [isDrawing]);

  const getPixelIndex = (e) => {
    const rect = e.target.getBoundingClientRect();

    const columnIndex = Math.floor((e.clientX - rect.left) / cellSize);
    const rowIndex = Math.floor((e.clientY - rect.top) / cellSize);

    const pixelIndex = rowIndex * columns + columnIndex;

    return pixelIndex;
  };

  const colorize = (index) => {
    setPixelGrid((grid) => {
      const colors = [...grid];
      colors[index] = "blue";
      return colors;
    });
  };

  const handleClick = (e) => {
    setIsDrawing(true);

    const index = getPixelIndex(e);
    colorize(index);
  };

  const handleDrag = (e) => {
    if (isDrawing) {
      const index = getPixelIndex(e);
      colorize(index);
    }
  };

  return (
    <Center>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseMove={handleDrag}
        onMouseDown={handleClick}
        onMouseUp={() => setIsDrawing(false)}
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
