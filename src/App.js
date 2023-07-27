import "./App.css";
import AlamLogo from "./components/AlamaLogo";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFlashcard from "./pages/createFlashcard_PageNo1/CreateFlashcard";
import MyFlashcard from "./pages/myFlashcard_PageNo2/MyFlashcard";
import NoPageFound from "./components/NoPageFound";

function App() {
  return (
    <div className="App">
      <AlamLogo />
      <div className=" my-10 m-auto w-[70%] ">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/CreateFlashcard" element={<CreateFlashcard />}>
              CreateFlashcard
            </Route>
            <Route path="/MyFlashcard" element={<MyFlashcard />}>
              MyFlashcard
            </Route>
            <Route path="/flashcardgenerator" element={<CreateFlashcard />}>
              Default Page
            </Route>
            <Route path="*" element={<NoPageFound />}>
              Default Page
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
