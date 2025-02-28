import React from "react";
import Grid from "./components/Grid";

const App = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Google Sheets Clone</h2>
      <Grid initialRows={5} initialCols={5} />
    </div>
  );
};

export default App;
