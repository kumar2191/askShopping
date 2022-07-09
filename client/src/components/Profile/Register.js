import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { register } from "../Connection";
import './register.css';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      selectedOption: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      selectedOption:this.state.selectedOption
    };
    register(newUser).then(res => {
      this.props.history.push(`/login`);
    });
  }
  render() {
    return (
      <div className="registerBackgroud">
        <Card className="registerForm">
          <h3 className="regHeading">Signup in AG Shopping</h3>
          <br />
          <p className="regHeading">Easily using</p>
          <CardBody>
            <Form noValidate onSubmit={this.onSubmit}>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      value={this.state.name}
                      id="exampleEmail"
                      placeholder="Name"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.email}
                      id="exampleEmail"
                      placeholder="Your Email Address"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Choose Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      type="number"
                      name="phone"
                      id="examplePassword"
                      placeholder="Mobile Number"
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <Row className="radio">
                <Col md={6}>
                  <label>
                    <input
                      type="radio"
                      name="selectedOption"
                      value="male"
                      checked={this.state.selectedOption === "male"}
                      onChange={this.onChange}
                    />
                    &nbsp; Male
                  </label>
                </Col>
                <Col md={6}>
                  <label>
                    <input
                      type="radio"
                      name="selectedOption"
                      value="female"
                      checked={this.state.selectedOption === "female"}
                      onChange={this.onChange}
                    />
                    &nbsp; Female
                  </label>
                </Col>
              </Row>
              <hr />
              <Button color="danger" className="rsignButton" type="submit">
                Register
              </Button>
              <p className="regHeading">
                Already Register?&nbsp;
                <span className="loginLink">
                  <a href="/login" className="loginLink">
                    Login
                  </a>
                </span>
              </p>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Register;