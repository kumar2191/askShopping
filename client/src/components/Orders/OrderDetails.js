import React, { useState, useEffect } from "react";
import OrderSideNav from "./OrderSideNav";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Card, CardBody, Row, Col, CardImg, Button } from "reactstrap";
import TimeStamp from "react-timestamp";
import Icon from "../Icon/Icon";
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import "./orders.css";
const OrderDetails = props => {
  const { match } = props;
  let { OrderId } = match.params;

  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  const [orderDetails, setorderDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/order/findOrderDetails/${OrderId}`)
      .then(res => setorderDetails(res.data))
      .catch(err => console.error(err));
  }, [OrderId]);

  console.log(orderDetails);

  const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);

  const orders = () => {
    return orderDetails.map((data, i) => {
      var offer = 0;
      var total = 0;
      var cod = 0;
      data.Product.map(x => {
        offer =
          Math.floor((x.product.Rate / 100) * x.product.offer * x.quantity) +
          offer;
        total = Math.floor(x.product.Rate * x.quantity) + total;
        cod =
          Math.floor(
            x.product.Rate - (x.product.Rate / 100) * x.product.offer
          ) *
            x.quantity +
          cod;
        return 1;
      });
      return (
        <React.Fragment>
          <Card key={`1${i}`}>
            <CardBody>
              <Row>
                <Col lg={"12"}>
                  <div className="placedDiv">
                    <span className="placedDate">
                      Placed On :&nbsp;
                      <TimeStamp
                        date={data.Time}
                        options={{ includeDay: false, twentyFourHour: false }}
                      />
                    </span>
                    <br />
                    <span className="placedDate">
                      Order.No :&nbsp;
                      <span className="orderNumber">{data.OrderId}</span>
                    </span>
                    <br />
                    <hr />
                    <Row>
                      <Col md={"2"}>
                        <span className="placedDatePrice">price details</span>
                      </Col>
                      <Col md={"4"}>
                        <Row>
                          <Col xs={"4"} className="mrp">
                            MRP :
                          </Col>
                          <Col xs={"6"} className="mrp">
                            {numberFormat(total)}
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={"4"} className="mrp">
                            discount(-)
                          </Col>
                          <Col xs={"6"} className="mrp">
                            {numberFormat(offer)}
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={"4"} className="mrp">
                            COD :
                          </Col>
                          <Col xs={"6"} className="mrp">
                            {numberFormat(cod)}
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col xs={"4"}>
                            <span className="TotalAmount">Total :</span>
                          </Col>
                          <Col xs={"6"}>
                            <span className="TotalAmount">
                              {numberFormat(cod)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <hr />
                    <div>
                      <span className="placedDate2">Update sent to:</span>
                      <br />
                      <span className="placedDate">
                        <FaMobileAlt size=".8rem" />
                        &nbsp;&nbsp;{data.address.phone}
                      </span>
                      <br />
                      <span className="placedDate">
                        <FaEnvelope size=".8rem" />
                        &nbsp;&nbsp;{decoded.email}
                      </span>
                      <br />
                      <hr />
                    </div>
                    <div>
                      <span className="placedDate2">Shipping Address</span>
                      <br />
                      <span className="placedDateName">
                        {data.address.name}
                      </span>
                      <br />
                      <span className="placedDate">
                        {data.address.address},{data.address.locality}
                        <br />
                        {data.address.city},{data.address.state}-
                        {data.address.pincode}
                      </span>
                      <hr />
                    </div>
                    <div>
                      <span className="placedDate2">Payment Mode :</span>
                      <br />
                      <span className="placedDate">{data.PaymentStatus}</span>
                      <br />
                      <hr />
                    </div>
                    <div>
                      <span className="placedDate2">Items in this order:</span>
                      <br />
                      <Row>
                        {data.Product.map(x => {
                          return (
                            <Col lg={"12"} className="orderProductColom">
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
                                        size:&nbsp;{x.size}
                                        &nbsp;|&nbsp;Qty:&nbsp;{x.quantity}
                                      </span>
                                      <br />
                                      <span className="orderProductPrice">
                                        {numberFormat(
                                          Math.floor(
                                            x.product.Rate -
                                              (x.product.Rate / 100) *
                                                x.product.offer
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
                                <Col
                                  md={"2"}
                                  className="orderProductArrowColom"
                                >
                                  <a href={`/order/product/${x._id}`}>
                                    <Icon className="fa fa-angle-right" />
                                  </a>
                                </Col>
                              </Row>
                            </Col>
                          );
                        })}
                      </Row>
                      <hr />
                      <Row>
                        <Col lg={"12"}>
                          <Button
                            outline
                            color="danger"
                            className="cancelBtn"
                            value={data._id}
                            onClick={() => {
                              axios
                                .put(
                                  "http://localhost:8080/order/updateStatus",
                                  { id: data._id, status: "canceled" }
                                )
                                .then(res => console.log(res))
                                .catch(err => console.log(err));
                              props.history.push("/orders");
                            }}
                          >
                            CancelOrder
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </React.Fragment>
      );
    });
  };

  return <OrderSideNav email={decoded.email} renders={orders()} />;
};

export default OrderDetails;
