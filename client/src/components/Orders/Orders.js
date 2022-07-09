import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardImg, Button } from "reactstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Icon from "../Icon/Icon";
import "./orders.css";
import OrderSideNav from "./OrderSideNav";
import EmptyOrders from "./EmptyOrders";

const Orders = props => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  const [id] = useState({ id: decoded._id });
  const [orders, setorders] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/order/getOrder", { ...id })
      .then(res => setorders(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);

  const orderRender = () => {
    return orders.map((data, i) => {
      return (
        <React.Fragment>
          <Card key={`1${i}`}>
            <CardBody>
              <Row>
                <Col lg={"9"}>
                  <h6 className="orderNumber">Order No : {data.OrderId}</h6>
                </Col>
                <Col lg={"3"}>
                  {data.status === "Order Placed" ? (
                    <a href={`order/${data.OrderId}`} className="orderDetails">
                      Order details
                    </a>
                  ) : (
                    <Button
                      color="danger"
                      className="cancelDetails"
                      onClick={() => {
                        axios
                          .post("http://localhost:8080/order/delOrder", {
                            id: data._id
                          })
                          .then(res => console.log(res))
                          .catch(err => console.log(err));
                        window.location.reload(true);
                      }}
                    >
                      Delete Order
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                {data.Product.map(x => {
                  return (
                    <Col lg={"12"} className="orderProductColom" key={`1${i}`}>
                      <Row>
                        <Col md={"6"}>
                          <Row>
                            <Col xs={"4"}>
                              <CardImg
                                className="orderProductImg"
                                src={x.product.productImage[0]}
                                alt=""
                              />
                            </Col>
                            <Col xs={"8"}>
                              <span className="orderProductName">
                                {x.product.name}
                              </span>
                              <br />
                              <span className="orderProductDes">
                                {x.product.description}
                              </span>
                              <br />
                              <span className="orderProductSizeandQty">
                                size:&nbsp;{x.size}&nbsp;|&nbsp;Qty:&nbsp;
                                {x.quantity}
                              </span>
                              <br />
                              <span className="orderProductPrice">
                                {numberFormat(
                                  Math.floor(
                                    x.product.Rate -
                                      (x.product.Rate / 100) * x.product.offer
                                  ) * x.quantity
                                )}
                              </span>
                              <br />
                              <span
                                className={
                                  data.status === "Order Placed"
                                    ? "orderStatus"
                                    : "orderCancel"
                                }
                              >
                                {data.status}
                              </span>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={"4"}></Col>
                        <Col md={"2"} className="orderProductArrowColom">
                          <a href={`order/product/${x._id}`}>
                            <Icon className="fa fa-angle-right" />
                          </a>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </React.Fragment>
      );
    });
  };
  return (
    <React.Fragment>
      {orders.length !== 0 ? (
        <OrderSideNav email={decoded.email} renders={orderRender()} />
      ) : (
        <EmptyOrders />
      )}
    </React.Fragment>
  );
};

export default Orders;
