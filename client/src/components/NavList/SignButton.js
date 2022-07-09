import React from "react";
import { Button ,Row ,Col,Card,CardBody,CardTitle} from "reactstrap";

function SignButton() {
  return (
    <div className="profileCard">
      <Card>
        <CardBody>
          <CardTitle>Welcome</CardTitle>
          <p>To access account and manage orders</p>
          <hr />
          <Row>
            <Col>
              <Button
                href="/register"
                className="profilebtn"
                outline
                color="danger"
              >
                SIGN UP
              </Button>
            </Col>
            <Col>
              <Button
                href="/login"
                className="profilebtn"
                outline
                color="danger"
              >
                LOGIN
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignButton;
