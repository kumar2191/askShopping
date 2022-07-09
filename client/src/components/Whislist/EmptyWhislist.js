import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import './whislist.css';
import { FaHeartBroken } from 'react-icons/fa';

const  EmptyWhislist = () => {
    return (
        <React.Fragment>
            <Container className="whislistContainer">
                <Row>
                    <Col md={'12'} className="emptyWhislistColom">
                        <div className="emptyWhislistDiv">
                            <span className="NoWhislist">No Whislist</span><br/>
                            <FaHeartBroken color="#ff3f6c" size="8rem" /><br/>
                            <Button outline className="addItemsWhislist" href="/mens">Add Item</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default EmptyWhislist
