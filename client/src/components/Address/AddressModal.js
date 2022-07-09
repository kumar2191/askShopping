import React from 'react'
import useAddress from "../../hooks/useAddress";
import axios from "axios";
import {Row,Col,Button,Form,Input,FormGroup,Label} from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const AddressModal = props => {

    const [valuesTwo, handleChangeTwo] = useAddress();
    const closeBtn2 = (
        <button className="close" onClick={props.toggle}>
          &times;
        </button>
      );

      const addAddressTwo = e => {
        e.preventDefault();
        console.log(valuesTwo);
        axios.put("http://localhost:8080/address/updateAddress", { ...valuesTwo })
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
        window.location.reload(true);
      };

    return (
        <React.Fragment>
          <Modal isOpen={props.edit} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn2}>
              Add Address
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={addAddressTwo}>
                <FormGroup>
                  <Label for="exampleEmail">
                    Contact details
                    <span className="important">*</span>
                  </Label>
                  <Input
                    className="idFides"
                    type="text"
                    value={(valuesTwo.id = props.id)}
                    name="id"
                    placeholder="id"
                    onChange={handleChangeTwo}
                  />
                  <Input
                    type="text"
                    name="name"
                    value={valuesTwo.name}
                    onChange={handleChangeTwo}
                    placeholder={`${props.name}`}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="phone"
                    value={valuesTwo.phone}
                    onChange={handleChangeTwo}
                    placeholder={`${props.phone}`}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Address<span className="important">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={valuesTwo.address}
                    name="address"
                    placeholder={`${props.address}`}
                    onChange={handleChangeTwo}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    value={valuesTwo.locality}
                    name="locality"
                    placeholder={`${props.locality}`}
                    onChange={handleChangeTwo}
                  />
                </FormGroup>
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Input
                        type="text"
                        value={valuesTwo.city}
                        name="city"
                        placeholder={`${props.city}`}
                        onChange={handleChangeTwo}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        value={valuesTwo.state}
                        name="state"
                        placeholder={`${props.state}`}
                        onChange={handleChangeTwo}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Input
                        type="text"
                        value={valuesTwo.pincode}
                        name="pincode"
                        placeholder={`${props.pincode}`}
                        onChange={handleChangeTwo}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="addressBtn">Update address</Button>
              </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
    )
}

export default AddressModal
