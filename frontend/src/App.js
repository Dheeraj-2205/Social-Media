import './App.css';
import {BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Header from './Component/Header/Header';
import Login from './Component/Login/Login';
import Home from "./Component/Home/Home.jsx"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, loadUser } from './Actions/User';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated} = useSelector(state => state.user);
  
  useEffect(()=>{
    dispatch(loadUser())
    dispatch(getAllUser())
  },[dispatch])

  return (
    <>
    <Router>
      {
        isAuthenticated && <Header/>
      }
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {isAuthenticated ? <Home/>  : <Login/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
