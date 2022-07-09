import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col } from "reactstrap";

class Cards extends Component {
  render() {
    return (
      <Card className={this.props.class}>
        <CardBody>
          <Row>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading1}</h6>
              <CardText>{this.props.list1}</CardText>
              <hr />
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading2}</h6>
              <CardText>{this.props.list2}</CardText>
              <hr />
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading3}</h6>
              <CardText>{this.props.list3}</CardText>
              <hr />
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading4}</h6>
              <CardText>{this.props.list4}</CardText>
              <hr />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg="3">
            
              <h6 className="menHeading">{this.props.heading5}</h6>
              <CardText>{this.props.list5}</CardText>
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading6}</h6>
              <CardText>{this.props.list6}</CardText>
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading7}</h6>
              <CardText>{this.props.list7}</CardText>
            </Col>
            <Col lg="3">
              <h6 className="menHeading">{this.props.heading8}</h6>
              <CardText>{this.props.list8}</CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Cards;
