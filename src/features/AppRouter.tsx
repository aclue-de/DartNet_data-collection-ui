import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Init from "./Init";
import NewThrow from "./NewThrow";

export const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Init />} />
      <Route path="/new-throw" element={<NewThrow />} />
    </Routes>
  </Router>
);
