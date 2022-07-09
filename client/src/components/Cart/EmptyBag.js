import React from 'react'
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap'
import { FaShoppingBag } from 'react-icons/fa';

const EmptyBag =() => {
    return (
        <React.Fragment>
            <Container className="cardContainer">
                <Row>
                    <Col lg={'12'}>
                    <Card>
                        <CardBody>
                        <div className="bagContainer">
                        <span className="NoBag">No Bag</span><br/>
                        <FaShoppingBag color='#ff3f6c' size='8rem'/><br/>
                        <Button outline className="addItemsBag" href="/mens">Add Item</Button>
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default EmptyBag
