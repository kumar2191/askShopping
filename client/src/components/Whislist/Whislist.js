import React, { useState,useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { CardBody, Card, Container, Col,CardImg, Row, Button } from 'reactstrap';
import './whislist.css';
import EmptyWhislist from './EmptyWhislist';

const Whislist = () => {

        let token = localStorage.usertoken;
        let decoded = jwt_decode(token);

        const [id] = useState({id:decoded._id});
        const [whislist, setwhislist] = useState([]);

        useEffect(()=>{
            axios.post("http://localhost:8080/whislist/getWhislist",{...id})
              .then(res => setwhislist(res.data))
              .catch(err => console.error(err));
        },[id])

        const whislistHandler = () =>{
            return whislist.map((data,i)=>{
                return (
                    <React.Fragment>
                        <Col md={'3'} className="whislistColom">
                        <Card>
                        <CardImg top width="100%" className="whislistImage" src={data.Product.productImage[0]} alt="Card image cap" />
                            <CardBody>
                                <div>
                            <span className="whislistName">{data.Product.name}({data.Product.brand})</span><br/>
                            <span className="wishlistDescription">{data.Product.description}</span><br/>
                            <span className="whislistRate">Rs:{
                            Math.floor((data.Product.Rate - ((data.Product.Rate / 100) * data.Product.offer)))
                            }&nbsp;<strike className="whislistprice">Rs:{data.Product.Rate}</strike>
                            <span className="whislistOffer">({data.Product.offer}% Off)</span></span></div>
                            <hr/>
                            <p className="whislistBtn"><a href={`/mens/${data.Product.code}`} className="addBagAlink">ADD BAG</a></p>
                            </CardBody>
                            <Button 
                            className="cancelBtnWhislist"
                            onClick={
                                ()=>{
                                    axios.post("http://localhost:8080/whislist/delWhislist",{id:data._id})
                                      .then(res => {
                                          console.log(res)
                                          window.location.reload(true);
                                        })
                                      .catch(err => console.error(err));
                                }
                            }
                            >X</Button>
                        </Card>
                        </Col>
                    </React.Fragment>
                )
            })
        }

    return (
        <React.Fragment>
            {whislist.length !== 0?<Container  className="whislistContainer">
            <Row>
            {whislistHandler()}
            </Row>
            </Container>:<EmptyWhislist />}
        </React.Fragment>
    )
}

export default Whislist
