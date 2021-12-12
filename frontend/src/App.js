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
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentScreen';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

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
            <Route path="/profile"><ProfilePage /></Route>
            <Route path="/shipping"><ShippingPage /></Route>
            <Route path="/payment"><PaymentPage /></Route>
            <Route path="/placeorder"><PlaceOrderPage /></Route>
            <Route path="/order/:id"><OrderPage /></Route>
            <Route path="/admin/userlist"><UserListPage /></Route>
            <Route path="/admin/user/:id/edit"><UserEditPage /></Route>
            <Route path="/admin/productlist"><ProductListPage /></Route>
            <Route path="/admin/product/:id/edit"><ProductEditPage /></Route>
            <Route path="/admin/orderlist"><OrderListPage /></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
