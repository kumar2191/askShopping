import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import "../Card/css/pro.css";

const AddressSide = (props) => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);
  const [cartNo] = useState({ id: decoded._id });

  const [Orders, setOrders] = useState([]);

  var price = 0;
  var discount =0;
  var address = props.location;



 const cartIds = [];

  useEffect(() => {
    axios
      .post("http://localhost:8080/cart/userCart", { ...cartNo })
      .then(res => {
        setOrders(res.data)
      })
      .catch(err => console.error(err));
  }, [cartNo]);

  const cartId = ()=>{
    return Orders.map((data,i)=>{
        return cartIds.push(data._id)
    })
  }
  cartId();

  const totalHandler = () => {
    return Orders.map(data =>{
      return (price = Math.floor(data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) * data.quantity + price);
    });
  };

  const discountHandler = () => {
    return Orders.map(data =>{
      return (discount =
        Math.floor(data.Product.Rate - (data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) * data.quantity) + discount);
    });
  };

  const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);

    const order = {
      id:decoded._id,
      address,
      cart:cartIds,
      total:price
    }  
    console.log(order);
  

    const createOrder = ()=>{
      axios.post('http://localhost:8080/order/createOrder',{
      id:decoded._id,
      address,
      cart:cartIds,
      total:price
    }).then(res=>console.log(res))
      .catch(err=>console.log(err))
    }

  return (
    <Card>
      <CardBody>
        <h6 className="productTotalPrice">Coupon</h6>
        <Row className="cartSidePriceRow">
          <Col md={"9"}>Apply Coupon</Col>
          <Col className="cartSideCoupon">Apply</Col>
        </Row>
        <hr />
        <h6 className="productTotalPrice">Price details</h6>
        <Row className="cartSidePriceRow">
          <Col md={"8"}>Bag Total</Col>
          <Col className="cartSidePrice">{ totalHandler() && numberFormat(price)}</Col>
        </Row>
        <Row className="cartSidePriceRow">
          <Col md={"8"}>Bag discount</Col>
          <Col className="cartSidediscount">{ discountHandler() && numberFormat(discount)}</Col>
        </Row>
        <Row className="cartSidePriceRow">
          <Col md={"8"}>Coupon discount</Col>
          <Col className="cartSideCoupon2">Apply</Col>
        </Row>
        <Row className="cartSidePriceRow">
          <Col md={"8"}>Order Total</Col>
          <Col className="cartSidePrice">{numberFormat(price)}</Col>
        </Row>
        <Row className="cartSidePriceRow">
          <Col md={"8"}>Delivery Charge</Col>
          <Col className="cartSidediscount">Free</Col>
        </Row>
        <hr />
        <Row className="cartSidePriceRow">
          <Col md={"8"}>
            <p className="productTotalPrice">Total</p>
          </Col>
          <Col className="cartSidePrice">
            <p className="productTotalPrice">
              { numberFormat(price)}
            </p>
          </Col>
        </Row>
        <Row className="cartSidePriceRow">
          <Col md={"12"}>
            <Button className="placeOrderBtn" href='/orders' onClick={createOrder()}>CONTINUE</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AddressSide;
