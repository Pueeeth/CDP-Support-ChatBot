import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Grid.css";

const API_BASE_URL = "http://localhost:8080/api/cells";

const Grid = ({ initialRows, initialCols }) => {
  const [data, setData] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const inputRefs = useRef({});

  // 🔹 Load data from backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/all`).then((response) => {
      const cells = response.data;
      const grid = Array(initialRows)
        .fill()
        .map(() => Array(initialCols).fill(""));

      cells.forEach((cell) => {
        const { cellKey, value } = cell;
        const [col, row] = parseCellKey(cellKey);
        grid[row][col] = value;
      });

      setData(grid);
    });
  }, [initialRows, initialCols]);

  // 🔹 Parse cell key (e.g., "A1" -> [0, 0])
  const parseCellKey = (key) => {
    const col = key.charCodeAt(0) - 65;
    const row = parseInt(key.substring(1), 10) - 1;
    return [col, row];
  };

  // 🔹 Convert row/col to cell key (e.g., [0,0] -> "A1")
  const getCellKey = (row, col) => `${String.fromCharCode(65 + col)}${row + 1}`;

  // 🔹 Handle input changes
  const handleChange = (row, col, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[row][col] = value;
      return newData;
    });

    saveCell(row, col, value);
  };

  // 🔹 Save cell to backend
  const saveCell = (row, col, value) => {
    const cellKey = getCellKey(row, col);
    axios
      .post(`${API_BASE_URL}/save`, {
        cellKey,
        value,
        formula: value.startsWith("=") ? value : null,
      })
      .then(() => fetchUpdatedCells());
  };

  // 🔹 Fetch updated cells (to handle dependencies)
  const fetchUpdatedCells = () => {
    axios.get(`${API_BASE_URL}/all`).then((response) => {
      const updatedCells = response.data;
      setData((prevData) => {
        const newData = [...prevData];
        updatedCells.forEach((cell) => {
          const [col, row] = parseCellKey(cell.cellKey);
          newData[row][col] = cell.value;
        });
        return newData;
      });
    });
  };

  // 🔹 Handle cell click (focus input)
  const handleCellClick = (row, col) => {
    setActiveCell(`${row}-${col}`);
    setTimeout(() => inputRefs.current[`${row}-${col}`]?.focus(), 0);
  };

  // 🔹 Add a new row
  const addRow = () => {
    setData([...data, Array(data[0].length).fill("")]);
  };

  // 🔹 Add a new column
  const addColumn = () => {
    setData(data.map((row) => [...row, ""]));
  };

  // 🔹 Delete a row
  const deleteRow = (index) => {
    if (data.length > 1) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  // 🔹 Delete a column
  const deleteColumn = (index) => {
    if (data[0].length > 1) {
      setData(data.map((row) => row.filter((_, i) => i !== index)));
    }
  };

  return (
    <div className="grid-container">
      <button className="add-btn" onClick={addRow}>
        + Row
      </button>
      <button className="add-btn" onClick={addColumn}>
        + Column
      </button>

      <table className="grid-table">
        <thead>
          <tr>
            <th></th>
            {data[0]?.map((_, i) => (
              <th key={i}>
                {String.fromCharCode(65 + i)}
                <button className="delete-btn" onClick={() => deleteColumn(i)}>
                  ×
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>
                {rowIndex + 1}
                <button className="delete-btn" onClick={() => deleteRow(rowIndex)}>
                  ×
                </button>
              </th>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`grid-cell ${activeCell === `${rowIndex}-${colIndex}` ? "active" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <input
                    ref={(el) => (inputRefs.current[`${rowIndex}-${colIndex}`] = el)}
                    type="text"
                    value={cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    onBlur={() => setActiveCell(null)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
