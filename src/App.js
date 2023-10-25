import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoBar from "./components/LogoBar";
import NavBar from "./components/NavBar";
import CreateFlashCard from "./pages/CreateFlashCard";
import MyFlashCard from "./pages/MyFlashCard";
import NoPageFound from "./components/NoPageFound";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";

// Import Redux related dependencies
import { Provider } from "react-redux";
 // Import your slice
import FlashCardDetails from "./pages/FlashCardDetails";



function App() {
  return (
    <div className="App">
      <LogoBar />
      <div>
        {/* Wrap the entire app in the Redux Provider */}
        <Provider store={store}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/createflashcard" element={<CreateFlashCard />}>
                CreateFlashcard
              </Route>
              <Route path="/myflashcard" element={<MyFlashCard />}>
                MyFlashcard
              </Route>
              <Route path="/flashCardDetails" element={<FlashCardDetails />}>
                FlashCardDetails Page
              </Route>
              <Route path="*" element={<CreateFlashCard />}>
                Default Page
              </Route>
              <Route path="*" element={<NoPageFound />}>
                Page Not Found
              </Route>
            </Routes>
          </Router>
        </Provider>
      </div>
    </div>
  );
}

export default App;
