import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SongForm } from "./SongForm";
import { CoverPage } from "./CoverPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongForm />} />
        <Route
          path="/cover/:songName/:artistName/:scoreLink/:songLink"
          element={<CoverPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
