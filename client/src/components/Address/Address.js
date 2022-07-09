import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import useAddress from "../../hooks/useAddress";
import {
  Container,
  CardBody,
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./address.css";
import AddressModal from "./AddressModal";
import AddressSide from "./AddressSide";

const Address = props => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);
  let userId = decoded._id;
  
  const [id] = useState({ id: decoded._id });

  const [edit, setedit] = useState(false);
  const toggleTwo = () => setedit(!edit);

  const [values, handleChange] = useAddress();
  const [address, setaddress] = useState("");

  const [Edit, setEdit] = useState();

  // const [delAddress, setdelAddress] = useState();

  const [oneAddress, setoneAddress] = useState({});

  const [modal, setModal] = useState(false);


  const [addressId, setaddressId] = useState({});

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const { className } = props;

  useEffect(() => {
    axios
      .post("http://localhost:8080/address/getAddress", { ...id })
      .then(res => {
        setaddress(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/address/oneAddress", { ...Edit })
      .then(res => {
        setoneAddress(res.data);
      })
      .catch(err => console.log(err));
  }, [Edit]);

  console.log(oneAddress);

  const addAddress = e => {
    e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:8080/address/createAddress", { ...values })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    // window.location.reload(true);
  };

  const dangerSet = e => {
    setEdit({ id: e.target.value });
    toggleTwo();
  };

  // const delAddressController = e => {
  //   setdelAddress({ id: e.target.value });
  //   window.location.reload(true);
  // };

  const getAddress = () => {
    return address.map((data, i) => {
      return (
        <React.Fragment>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <input
                    type="radio"
                    name="address"
                    value={data._id}
                    onClick={e => setaddressId(e.target.value)}
                  />
                </Col>
                <Col md={"11"}>
                  <h5>
                    {data.name}&nbsp;({data.Type})
                  </h5>
                  <div className="Address">
                    {data.address},{data.locality},{data.city},<br />
                    {data.state}-{data.pincode}
                  </div>
                  <div className="COD">
                    Mobile:&nbsp;<b>{data.phone}</b>
                  </div>
                  <div className="COD">Cash on Delivery is available</div>
                  <br />
                  <Row>
                    <Col md={"3"}>
                      <Button
                        outline
                        color="danger"
                        onClick={() => {
                          axios
                            .post("http://localhost:8080/address/delAddress", {
                              id: data._id
                            })
                            .then(res => console.log(res))
                            .catch(err => console.log(err));
                          window.location.reload(true);
                        }}
                        value={data._id}
                        className="RemoveBtn"
                      >
                        Remove
                      </Button>
                    </Col>
                    <Col md={"3"}>
                      <Button
                        outline
                        color="success"
                        value={data._id}
                        className="RemoveBtn"
                        onClick={dangerSet}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </React.Fragment>
      );
    });
  };
  const editDetail = () => {
    return (
      <AddressModal
        id={oneAddress._id}
        name={oneAddress.name}
        phone={oneAddress.phone}
        address={oneAddress.address}
        locality={oneAddress.locality}
        city={oneAddress.city}
        state={oneAddress.state}
        pincode={oneAddress.pincode}
        edit={edit}
        toggle={toggleTwo}
      />
    );
  };
  const renderAddress = () => {
    if (address.length !== 0) {
      return (
        <React.Fragment>
          <Container className="addressContainer">
            <Row>
              <Col lg={"8"}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={"9"}>
                        <h6 className="productTotalPrice">Shopping Address</h6>
                      </Col>
                      <Col md={"3"}>
                        <Button className="addressBtn" onClick={toggle}>
                          Add Address
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {getAddress()}
                <Card className="addAddressBorder" onClick={toggle}>
                  <CardBody>
                    <Row>
                      <Col>
                        <h4>+</h4>
                      </Col>
                      <Col md={"11"}>
                        <h5>Add Address</h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <AddressSide location={addressId} />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Container className="addressContainer">
            <Row>
              <Col lg={"8"}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={"12"}>
                        <Form onSubmit={addAddress}>
                          <FormGroup>
                            <Label for="exampleEmail">
                              Contact details
                              <span className="important">&nbsp;*</span>
                            </Label>
                            <Input
                              className="idFides"
                              type="text"
                              value={(values.id = userId)}
                              name="id"
                              placeholder="id"
                              onChange={handleChange}
                            />
                            <Input
                              type="text"
                              name="name"
                              value={values.name || ""}
                              onChange={handleChange}
                              placeholder="Name"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="text"
                              name="phone"
                              value={values.phone || ""}
                              onChange={handleChange}
                              placeholder="Mobile"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>
                              Address<span className="important">&nbsp;*</span>
                            </Label>
                            <Input
                              type="text"
                              value={values.address || ""}
                              name="address"
                              placeholder="Address(House No,Bulding,Street,Area)"
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="text"
                              value={values.locality || ""}
                              name="locality"
                              placeholder="locality"
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Input
                                  type="text"
                                  value={values.city || ""}
                                  name="city"
                                  placeholder="city"
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Input
                                  type="text"
                                  value={values.state || ""}
                                  name="state"
                                  placeholder="state"
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Input
                                  type="text"
                                  value={values.pincode || ""}
                                  name="pincode"
                                  placeholder="pincode"
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>
                              Address Type
                              <span className="important">&nbsp;*</span>
                            </Label>
                            <Container>
                              <Row>
                                <Col md={"3"}>
                                  <Row>
                                    <Col>Home</Col>
                                    <Col>
                                      <Input
                                        type="radio"
                                        name="Type"
                                        value={"Home"}
                                        onChange={handleChange}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={"3"}>
                                  <Row>
                                    <Col>Work</Col>
                                    <Col>
                                      <Input
                                        type="radio"
                                        name="Type"
                                        value={"Work"}
                                        onChange={handleChange}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={"3"}>
                                  <Row>
                                    <Col>Office</Col>
                                    <Col>
                                      <Input
                                        type="radio"
                                        name="Type"
                                        value={"Office"}
                                        onChange={handleChange}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Container>
                          </FormGroup>
                          <Button className="addressBtn">Add address</Button>
                        </Form>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <AddressSide />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  };
  return (
    <React.Fragment>
      {renderAddress()}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Add Address
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={addAddress}>
            <FormGroup>
              <Label for="exampleEmail">
                Contact details
                <span className="important">*</span>
              </Label>
              <Input
                className="idFides"
                type="text"
                value={(values.id = userId)}
                name="id"
                placeholder="id"
                onChange={handleChange}
              />
              <Input
                type="text"
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="phone"
                value={values.phone || ""}
                onChange={handleChange}
                placeholder="Mobile"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Address<span className="important">*</span>
              </Label>
              <Input
                type="text"
                value={values.address || ""}
                name="address"
                placeholder="Address(House No,Bulding,Street,Area)"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                value={values.locality || ""}
                name="locality"
                placeholder="locality"
                onChange={handleChange}
              />
            </FormGroup>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Input
                    type="text"
                    value={values.city || ""}
                    name="city"
                    placeholder="city"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Input
                    type="text"
                    value={values.state || ""}
                    name="state"
                    placeholder="state"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Input
                    type="text"
                    value={values.pincode || ""}
                    name="pincode"
                    placeholder="pincode"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>
                Address Type<span className="important">&nbsp;*</span>
              </Label>
              <Container>
                <Row>
                  <Col md={"3"}>
                    <Row>
                      <Col>Home</Col>
                      <Col>
                        <Input
                          type="radio"
                          name="Type"
                          value={"Home"}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={"3"}>
                    <Row>
                      <Col>Work</Col>
                      <Col>
                        <Input
                          type="radio"
                          name="Type"
                          value={"Work"}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={"3"}>
                    <Row>
                      <Col>Office</Col>
                      <Col>
                        <Input
                          type="radio"
                          name="Type"
                          value={"Office"}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </FormGroup>
            <Button className="addressBtn">Add address</Button>
          </Form>
        </ModalBody>
      </Modal>
      {/* <h6>{cartId()}</h6> */}
      {oneAddress ? editDetail() : ""}
    </React.Fragment>
  );
};

export default Address;
