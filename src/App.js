import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoBar from "./components/LogoBar";
import NavBar from "./components/NavBar";
import CreateFlashCard from "./pages/CreateFlashCard";
import MyFlashCard from "./pages/MyFlashCard";
import NoPageFound from "./components/NoPageFound";

function App() {
  return (
    <div className="App">
      <LogoBar />
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/createflashcard" element={<CreateFlashCard />}>
              CreateFlashcard
            </Route>
            <Route path="/myflashcard" element={<MyFlashCard />}>
              MyFlashcard
            </Route>
            <Route path="/" element={<CreateFlashCard />}>
              Default Page
            </Route>
            <Route path="*" element={<NoPageFound />}>
              Page Not Found
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
