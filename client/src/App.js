import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards/es/styles-compiled.css";
import "./components/Card/css/pro.css";
import Header from "./components/Navbar/Header";
import Footer from "./components/Footer/Footer";
import Register from "./components/Profile/Register";
import Login from "./components/Profile/Login";
import Carousel from "./components/slider/Carousel";
import ProfilePage from "./components/Profile/ProfilePage";
import Gallery from "./components/Gallery/Gallery";
import Product from "./components/products/Product";
import ProductDetail from "./components/products/productDetail/ProductPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import BagNavbar from "./components/Navbar/BagNavbar";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/Orders/OrderDetails";
import OrderProduct from "./components/Orders/OrderProduct";
import Whislist from "./components/Whislist/Whislist";
import CardPayment from "./components/Payment/CardPayment";

function App() {
  const path = window.location.pathname;
  return (
    <Router>
      <Route
        path="/"
        component={
          path === "/cart" || path === "/address" || path === "/orders"
            ? BagNavbar
            : Header
        }
      />
      <Route exact path="/" component={Carousel} />
      <Route exact path="/" component={Gallery} />
      <Route exact path="/mens" component={Product} />
      <Route path="/mens/:code" component={ProductDetail} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/address" component={Address} />
      <Route path="/orders" component={Orders} />
      <Route path="/payment" component={CardPayment} />
      <Route exact path="/order/:OrderId" component={OrderDetails} />
      <Route path="/order/product/:productId" component={OrderProduct} />
      <Route path="/whislist" component={Whislist} />
      <Route path="/" component={Footer} />
    </Router>
  );
}
export default App;
