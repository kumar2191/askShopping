import React, { Component } from "react";
import {Card,CardBody,Row} from "reactstrap";
import jwt_decode from "jwt-decode";
// import { updateProfile } from "../Connection";
import {
Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./ProfilePage.css";
class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: "",
      name: "",
      phone: "",
      selectedOption: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    //  this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClick() {
    this.setState({ disabled: !this.state.disabled });
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      phone: decoded.phone,
      email: decoded.email,
      name: decoded.name,
      selectedOption: decoded.selectedOption
    });
  }
  render() {
    return (
      <div className="profileContainer">
        <div className="profilePage">
          <Card>
            <CardBody>
              <h2 className="profilePageHeading">Profile</h2>
              <hr />
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="name"
                      id="exampleEmail"
                      value={this.state.name}
                      disabled={this.state.disabled ? "disabled" : ""}
                      onChange={this.onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="examplePassword"
                      value={this.state.email}
                      disabled={this.state.disabled ? "disabled" : ""}
                      onChange={this.onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Phone
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="phone"
                      id="examplePassword"
                      value={this.state.phone}
                      disabled={this.state.disabled ? "disabled" : ""}
                      onChange={this.onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Gender
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="selectedOption"
                      id="examplePassword"
                      value={this.state.selectedOption}
                      disabled={this.state.disabled ? "disabled" : ""}
                      onChange={this.onChange}
                    />
                  </Col>
                </FormGroup>
                <hr />
                <Row>
                  <Col>
                    <Button
                      color="danger"
                      className="updateButton"
                      onClick={this.handleClick.bind(this)}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      color="success"
                      type="submit"
                      className="updateButton"
                      onClick={this.onSubmit}
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
              <hr />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
