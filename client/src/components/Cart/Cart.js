import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cartcard from "../Card/Cartcard";
import "../Card/css/pro.css";
import { Card, CardBody, CardImg, Button } from "reactstrap";
import { Row, Col } from "reactstrap";

import { toast } from 'react-toastify';
import EmptyBag from "./EmptyBag";
toast.configure();


const Cart = () => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  const [id] = useState({ id: decoded._id });
  const [cart, setcart] = useState([]);
  const [quantity, setquantity] = useState({ quantity: 1 });
  const [cartId, setcartId] = useState();
  const [cartFind, setcartFind] = useState();

  var price = 0;
  var discount =0;
  const bag = cart.length;

  useEffect(() => {
    axios
      .post("http://localhost:8080/cart/userCart", { ...id })
      .then(res => {
        setcart(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/cart/delProduct", { ...cartId })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cartId]);

  useEffect(() => {
    axios
      .put("http://localhost:8080/cart/quantity", { ...cartFind, ...quantity })
      .then(res => {
        res.status(200).json(res);
      })
      .catch(err => {
        console.log("hello", err);
      });
  }, [cartFind, quantity]);

  const quantityChanger = e => {
    setcartFind({
      id: e.target.id
    });
    setquantity({
      quantity: e.target.value
    });
    window.location.reload(true);
  };

  const delPro = e => {
    setcartId({
      id: e.target.value
    });
    window.location.reload(false);
  };

  const totalHandler = () => {
    return cart.map(data =>{
      return (price =
        Math.floor(data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) * data.quantity +
        price);
    });
  };

  const discountHandler = () => {
    return cart.map(data =>{
      return (discount =
        Math.floor(data.Product.Rate - (data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) * data.quantity)+ discount);}
    );
  };

  const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);
    
    

  const cartController = () => {
    return cart.map((data, i) => {
      return (
        <React.Fragment>
          <Card key={`1${i}`}>
              <CardBody>
                <Row>
                  <Col md={"3"}>
                    <CardImg src={data.Product.productImage[0]} alt={"product"} />
                  </Col>
                  <Col md={"9"}>
                    <Row>
                      <Col md={"9"}>
                        <div>
                          <h5 id={"c1"}>
                            {data.Product.name}&nbsp;
                            <span id={"c2"}>({data.Product.brand})</span>
                          </h5>
                        </div>
                        <p>{data.Product.description}</p>
                      </Col>
                      <Col md={"3"}>
                        <p id="hexagon2">
                        {data.Product.offer}% of <strike>{data.Product.Rate}</strike>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={"9"}>
                        <Row>
                          <Col xs={"6"}>
                            <div className="productTotalPrice">
                              size:&nbsp;{data.size}
                            </div>
                          </Col>
                          <Col xs={"6"}>
                            <span className="productTotalPrice">
                              Qty:
                              <select
                                name={data._id}
                                id={data._id}
                                onChange={quantityChanger}
                                value={data.quantity}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                              &nbsp; X{" "}
                              {Math.floor(data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={"3"}>
                        <p className="productTotalPrice">
                          {numberFormat(
                            Math.floor(data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) *
                              data.quantity
                          )}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg={'4'}>
                    <Button
                        outline
                        color="danger"
                        onClick={delPro}
                        value={data._id}
                        className="RemoveBtn"
                      >
                        Remove
                      </Button>
                    </Col>
                    <Col lg={'4'}>
                    <Button
                        outline
                        color="success"
                        value={data._id}
                        className="RemoveBtn"
                        onClick={()=>{
                          axios
                            .post("http://localhost:8080/whislist/createWhislist",{id:decoded._id,cart:data._id})
                            .then(res => {console.log(res);
                              toast.success('Add to Whislist');
                              window.location.reload(true);
                            })
                            .catch(err => console.error(err));
                        }}
                      >
                        Move to Whislist
                      </Button>
                    </Col>
                    <Col lg={'4'}>
                    <p className="productTotalPrice2">Rs :&nbsp;
                          {numberFormat(
                            Math.floor(data.Product.Rate - (data.Product.Rate / 100) * data.Product.offer) *
                              data.quantity
                          )}
                        </p>
                    </Col>
                </Row>
              </CardBody>
            </Card>
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      {cart.length !==0?<Cartcard
        totalPrice={totalHandler() && price}
        card={cartController()}
        bag={bag}
        discount={discountHandler() && discount}
      />:<EmptyBag />}
    </React.Fragment>
  );
};

export default Cart;
