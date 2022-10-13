import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages";

import Header from "../header/Header";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="MarvelPortal" element={<MainPage />} />
            <Route path="MarvelPortal/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
