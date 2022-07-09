import React, { Component } from "react";
import "./profile.css";
import { Button, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import jwt_decode from "jwt-decode";

class LoginButton extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      email: decoded.email,
      name: decoded.name
    });
  }
  logout() {
    localStorage.removeItem("usertoken");
  }
  render() {
    return (
      <div className="profileCard">
        <Card>
          <CardBody>
            <CardTitle>
              Welcome <span className="h3 userName">{this.state.name}</span>
            </CardTitle>
            <p>{this.state.email}</p>
            <hr />
            <Row>
              <Col>
                <Button className="profilebtn" href="/profile" outline color="danger">
                  Profile
                </Button>
              </Col>
              <Col>
                <Button
                  className="profilebtn"
                  outline
                  color="danger"
                  onClick={this.logout.bind(this)}
                  href="/"
                >
                  LogOut
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default LoginButton;
