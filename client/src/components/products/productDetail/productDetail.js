import React from "react";
import { Container, Row, Col, Button, Card, CardBody,ListGroupItem,ListGroup } from "reactstrap";
import Icon from "../../Icon/Icon";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from 'react-toastify';
import Price from 'react-countup';

toast.configure();

const productDetail = props => {
        let token = localStorage.usertoken;
        let decoded = jwt_decode(token);
  return (
    <div>
      <Container fluid={true} className="productImageContainer">
        <Row>
          <Col md={"12"}>
            <h1 className="productName">
              {props.ProName}
              <span className="RateText">({props.Brand})</span>
            </h1>
            <p className="productDes">{props.ProSubName}</p>
            <Row>
              <Col></Col>
            </Row>
            <div>
              <span className="priceText">Rs.<Price end={props.price} duration={5}/></span>
              <strike className="RateText">Rs.<Price end={props.rate} duration={5}/></strike>
              <span className="offerText">(<Price end={props.offer} duration={5}/>% OFF)</span>
            </div>
            <br />
            <div>
              <p className="includeTax">inclusive of all taxes</p>
            </div>
            <br />
            <h4 className="productName">SELECT SIZE</h4>
            <br />
            <div className="SizeContainer">{props.SizeButtons}</div>
            <br />
            <Container>
              <Row>
                <Col md={"7"}>
                  <Button className="AddCartButton" onClick={props.click} value={props.Code}>
                    <Icon className="fa fa-shopping-bag addIcon" />
                    <span className="addText">ADD TO BAG</span>
                  </Button>
                </Col>
                <Col md={"5"}>
                  <Button className="WhislistButton" 
                    onClick={
                      ()=>{
                        axios
                          .post("http://localhost:8080/whislist/productWhislist",{id:decoded._id,product:props.productId})
                          .then(res => {
                            console.log(res);
                            toast.success('Add to Whislist',{autoClose:2000});
                          })
                          .catch(err => console.error(err));
                      }
                    }>
                    <Icon className="fa fa-bookmark" />
                    <span className="addText">WISHLIST</span>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <br />
        <Card>
          <CardBody>
            <h6 className="TagCard">
              Best Price :&nbsp;
              <span className="TagPrice">Rs.{props.price}</span>
            </h6>
            <br />
            <h6 className="TagCard">
              Applicable on:Order above&nbsp;
              <span className="TagPrice">Rs.{props.rate}</span>
            </h6>
            <h6 className="TagCard">
              Product code:&nbsp;
              <span className="TagCode">{props.Code}</span>
            </h6>
            <h6 className="TagCard">
              Max Discount :&nbsp;
              <span className="TagOffer">{props.offer}% </span>
              of MRP(Your total saving :&nbsp;
              <span className="TagSave">Rs.{props.saving}</span>)
            </h6>
          </CardBody>
        </Card>
        <br />
        <h4>Specifications</h4>
        <br />
        <Row>
          <Col md={"6"}>
          <ListGroup>
                  <ListGroupItem className="specificationContents">
                    Brand :&nbsp;<span className="specificationContent">{props.Brand}</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
                    Product :&nbsp;<span className="specificationContent">{props.ProName}</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
                    Sizes :&nbsp;<span className="specificationContent">{props.sizes}</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
                    Price:&nbsp;<span className="specificationContent">{props.price}</span>
                  </ListGroupItem>
                </ListGroup>
          </Col>
          <Col md={"6"}>
          <ListGroup>
                  <ListGroupItem className="specificationContents">
                    Product code :&nbsp;<span >{props.Code}</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
                    Order above :&nbsp;<span className="specificationContent">{props.rate}</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
                    Offer :&nbsp;<span className="specificationContent">{props.offer}%</span>
                  </ListGroupItem>
                  <ListGroupItem className="specificationContents">
              Saving :&nbsp;<span className="specificationContent">{props.saving}</span>
                  </ListGroupItem>
                </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default productDetail;
