import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SongForm } from "./SongForm";
import { CoverPage } from "./CoverPage";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongForm />} />
        <Route path="/cover" element={<CoverPage />} />
      </Routes>
    </Router>
  );
}
