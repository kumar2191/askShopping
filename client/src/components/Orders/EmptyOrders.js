import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import OrderSideNav from './OrderSideNav'
import jwt_decode from "jwt-decode";
import { FaTruckLoading } from 'react-icons/fa';
import './orders.css';

const EmptyOrders =() => {

    let token = localStorage.usertoken;
    let decoded = jwt_decode(token);
    const emptyOrders =()=>{
        return (
            <React.Fragment>
            <Row>
                <Col lg={'12'} className="noOrderColom">
                <div className="noOrders">
                <span className="NoOrders">No Order</span><br/>   
                <FaTruckLoading color= "#ff3f6c" size="6rem" /><br/>
                <Button outline className="addItemsOrder" href="/mens">Add Item</Button>
                </div>
                </Col>
            </Row>
        </React.Fragment>
        )
    }
    return <OrderSideNav email={decoded.email} renders={emptyOrders()} />
}

export default EmptyOrders
