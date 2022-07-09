import React, { useState, useEffect } from "react";
import OrderSideNav from "./OrderSideNav";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Card, CardBody, Row, Col, CardImg } from "reactstrap";
import Icon from "../Icon/Icon";

const OrderProduct = props => {
  const { match } = props;
  let { productId } = match.params;

  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  const [orderProduct, setorderProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/order/findProduct/${productId}`)
      .then(res => setorderProduct(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  console.log(orderProduct);

  const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);

  const ordersProduct = () => {
    return orderProduct.map((data, i) => {
      return (
        <React.Fragment>
          <Card key={`1${i}`}>
            <CardBody>
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
                              <hr />
                              <div className="orderProductSingle">
                                <span className="placedDate2">
                                  MRP :
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {numberFormat(
                                    Math.floor(x.product.Rate * x.quantity)
                                  )}
                                </span>
                                <br />
                                <span className="placedDate2">
                                  discount : (-)
                                  {numberFormat(
                                    Math.floor(
                                      (x.product.Rate / 100) *
                                        x.product.offer *
                                        x.quantity
                                    )
                                  )}
                                </span>
                                <br />
                                <span className="placedDate2">
                                  COD
                                  :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {numberFormat(
                                    Math.floor(
                                      x.product.Rate -
                                        (x.product.Rate / 100) * x.product.offer
                                    ) * x.quantity
                                  )}
                                </span>
                                <hr />
                                <span className="TotalAmount">
                                  Total:&nbsp;&nbsp;&nbsp;
                                  {numberFormat(
                                    Math.floor(
                                      x.product.Rate -
                                        (x.product.Rate / 100) * x.product.offer
                                    ) * x.quantity
                                  )}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={"4"}></Col>
                        <Col md={"2"} className="orderProductArrowColom">
                          <a href={`/order/product/${x._id}`}>
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

  return <OrderSideNav email={decoded.email} renders={ordersProduct()} />;
};

export default OrderProduct;
