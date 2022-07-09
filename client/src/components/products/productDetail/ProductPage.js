import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Button } from "reactstrap";
import "./productDetail.css";
import ProductDetail from "./productDetail";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

toast.configure();

const ProductPage = props => {
  const { match } = props;
  let { code } = match.params;

  const [productDetail, setProductDetail] = useState([]);
  const [addCart] = useState();
  const [size, setsize] = useState([]);

  console.log(size);
  console.log(productDetail);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${code}`)
      .then(res => {
        setProductDetail(res.data);
      })
      .catch(err => console.error(err));
  }, [code]);

  useEffect(() => {}, [addCart, size]);

  const productPage = () => {
    return productDetail.map(data => {
      return (
        <React.Fragment>
          {data.productImage.map(x => (
            <Col lg={"6"} className="productImageCol">
              <img className="productDetailImage" src={x} alt="" />
            </Col>
          ))}
        </React.Fragment>
      );
    });
  };
  const nav = () => {
    if (size >= 0) {
      toast.error("Please select size", { autoClose: 2000 });
    } else if (!localStorage.usertoken) {
      toast.error("Please Login!", { autoClose: 2000 });
      props.history.push("/login");
    } else {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      axios
        .post("http://localhost:8080/cart/createCart", {
          code: code,
          ...size,
          id: decoded._id
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("You are  loser");
        });
      props.history.push("/cart");
    }
  };

  const productPageTwo = () => {
    return productDetail.map(data => {
      let price = Math.floor(data.Rate - (data.Rate / 100) * data.offer);
      let save = data.Rate - price;

      return (
        <React.Fragment>
          <ProductDetail
            key={data._id}
            productId={data._id}
            location={size}
            click={nav}
            ProName={data.name}
            Brand={data.brand}
            ProSubName={data.description}
            saving={save}
            price={price}
            rate={data.Rate}
            Code={data.code}
            offer={data.offer}
            SizeButtons={data.size.map(x => (
              <span>
                <Button
                  id={x}
                  className="productSizeButton"
                  value={x}
                  onClick={e => setsize({ size: e.target.value })}
                >
                  {x}
                </Button>
              </span>
            ))}
            sizes={data.size.map(x => (
              <span>&nbsp;{x},</span>
            ))}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      <Container fluid={true}>
        <Row>
          <Col lg={"6"}>
            <Container fluid={true} className="productImageContainer">
              <Row>{productPage()}</Row>
            </Container>
          </Col>
          <Col lg={"6"}>{productPageTwo()}</Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductPage;
