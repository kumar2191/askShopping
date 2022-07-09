import React from "react";
import { Jumbotron, Container } from "reactstrap";
import './footer.css';
const Footer = props => {
  return (
    <div className="footerContent">
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Ask-Shopping</h1>
          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Footer;
