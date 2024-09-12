import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Book from "./components/Book";
import Layout from "./components/Layout/Layout";
// import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/:version/:bookName" element={<Book />} />
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
