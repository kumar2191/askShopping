import React, { Component } from 'react'
import {Card,CardBody, Col, Row, Button, Form, FormGroup,Input } from 'reactstrap';
import { login } from '../Connection';
import './register.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log('hello');
    login(user).then(res => {
      if (res) {
        window.history.back();
      }
    });
  }
  render() {
    return (
      <div className="registerBackgroud">
        <Card className="loginForm">
          <h3 className="regHeading">Login in AG Shopping</h3>
          <br />
          <p className="regHeading">Easily using</p>
          <CardBody>
            <Form noValidate onSubmit={this.onSubmit}>
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
              <Button  color="danger" className="rsignButton" type="submit">
                Login
              </Button>
              <p className="regHeading">
                Create New Account?&nbsp;
                <span className="loginLink">
                  <a href="/register" className="loginLink">
                    Register
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

export default Login;
