import './App.css';
import {BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Header from './Component/Header/Header';
import Login from './Component/Login/Login';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path = "/" element = {<Login/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
