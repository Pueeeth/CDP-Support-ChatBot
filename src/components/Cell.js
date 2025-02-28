import React, { useState } from "react";
import "./Cell.css";

const Cell = ({ row, col, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value || "");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setCellValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(row, col, cellValue);
  };

  return (
    <td onDoubleClick={handleDoubleClick} className="cell">
      {isEditing ? (
        <input
          type="text"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        cellValue
      )}
    </td>
  );
};

export default Cell;
