import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Casino from "./Casino";
import PetGame from "./PetGame";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<PetGame />} />
          <Route path="/Casino" element={<Casino />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
