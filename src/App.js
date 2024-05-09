import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import Education from "./components/Education";
import Stocks from "./components/Stocks";
import Upload from "./components/Upload";
import ViewPort from "./components/ViewPort";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/tvshow" element={<TVShows />} />
          <Route path="/education" element={<Education />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/viewport" element={<ViewPort />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
