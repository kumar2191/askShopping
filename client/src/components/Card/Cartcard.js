import React from 'react'
import { Container,Row, Col, Card,CardBody, Button} from 'reactstrap'
import './css/pro.css';
const Cartcard =(props)=> {

const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value);


  const bagSideCart = () =>{
      if(props.bag !== 0){
                return (
                    <React.Fragment>
        <Container className="cardContainer">
        <Row>
        <Col lg={'8'}>
            <Card>
                <CardBody>
                <Row>
                    <Col md={'9'}><h6 className="productTotalPrice">My Shopping Bag ({props.bag}&nbsp;items)</h6></Col>
                    <Col md={'3'}><h6 className="productTotalPrice">Total : {numberFormat(props.totalPrice)}</h6></Col>
                </Row>
                </CardBody>
            </Card>
            {props.card}
            </Col>
            <Col lg={'4'}>
            <Card>
                <CardBody>
                    <h6 className="productTotalPrice">Coupon</h6>
                <Row className="cartSidePriceRow">
                        <Col md={'9'}>Apply Coupon</Col>
                        <Col className="cartSideCoupon">Apply</Col>
                    </Row>
                    <hr />
                    <h6 className="productTotalPrice">Price details</h6>
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}>Bag Total</Col>
                        <Col className="cartSidePrice">{numberFormat(props.totalPrice)}</Col>
                    </Row>
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}>Bag discount</Col>
                        <Col className="cartSidediscount">{numberFormat(props.discount)}</Col>
                    </Row>
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}>Coupon discount</Col>
                        <Col className="cartSideCoupon2">Apply</Col>
                    </Row>
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}>Order Total</Col>
                        <Col className="cartSidePrice">{numberFormat(props.totalPrice)}</Col>
                    </Row>
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}>Delivery Charge</Col>
                        <Col className="cartSidediscount">Free</Col>
                    </Row>
                    <hr />
                    <Row className="cartSidePriceRow">
                        <Col md={'8'}><p className="productTotalPrice">Total</p></Col>
                        <Col className="cartSidePrice"><p className="productTotalPrice">{numberFormat(props.totalPrice)}</p></Col>
                    </Row>
                    <Row className="cartSidePriceRow">
                        <Col md={'12'}>
                            <Button className="placeOrderBtn" href='/address'>PLACE ORDER</Button>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            </Col>
        </Row>
    </Container>
        </React.Fragment>
                )
      }else{
          return(<React.Fragment></React.Fragment>)
      }
  }
    return (
        <React.Fragment>
            {bagSideCart()}
        </React.Fragment>
    )
}

export default Cartcard
