import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from"react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ChartComponent from './Charts/ChartComponent';
import D3ChartComponent from './Charts/D3ChartComponent';
function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <switch>
          <Route path="/about">
             <AboutPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>  
          <Route path="/">
            <HomePage/>
          </Route>

        </switch>
        <ChartComponent/>
        <D3ChartComponent/>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
