import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main">
          <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/product/:id"><ProductDetailsPage /></Route>
            <Route path="/cart/:id?" ><CartPage /></Route>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterPage /></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
