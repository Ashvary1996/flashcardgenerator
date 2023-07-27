import "./App.css";
import AlamLogoBar from "./components/pages/createFlashcard_PageNo1/AlamLogoBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainFlashcard from "./components/pages/createFlashcard_PageNo1/MainFlashcard";
import CreateFlashcard from "./components/pages/createFlashcard_PageNo1/CreateFlashcard";
import MyFlashcard from "./components/pages/myFlashcard_PageNo2/MyFlashcard";

function App() {
  return (
    <div className="App">
      <AlamLogoBar />

      <div className=" my-10 m-auto w-[70%] ">
        <Router>
          <MainFlashcard />
          <Routes>
            <Route path="/CreateFlashcard" element={<CreateFlashcard />}>
              CreateFlashcard
            </Route>
            <Route path="/MyFlashcard" element={<MyFlashcard />}>
              MyFlashcard
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
