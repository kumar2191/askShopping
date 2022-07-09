import React,{useState,useEffect} from "react";
import axios from "axios";
import { Row, Container,Col,Form} from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import ProductCard from '../Card/ProductCard';
import './Product.css';

const Product =()=>{
  const [product, setproduct] = useState([]);
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [Rate, setRate] = useState([]);

      console.log(Rate)
    useEffect(() => {
      axios
        .post("http://localhost:8080/product/filter", {
          ...brand,
          ...size,
          ...Rate
        })
        .then(res => {
          setproduct(res.data);
          console.log(brand);
          console.log(size);
          console.log(Rate);
        })
        .catch(err => console.error(err));
    }, [brand, size, Rate]);

  const productSrc=()=>{
    // console.log(product);
    return product.map((data, i) => {
      let price = Math.floor((data.Rate - ((data.Rate / 100) * data.offer)));
      return (
        <Col lg={3}>
          <ProductCard
            href={data.code}
            name={data.name}
            Brand={data.brand}
            src={data.productImage[0]}
            price={price}
            rate={data.Rate}
            des={data.description}
            sizes={data.size.map(x => (
              <span className="sizeRadioButton">
                {x}
              </span>
            ))}
          />
        </Col>
      );
    });
  }
  return (
    
    <React.Fragment>
      <Container fluid={true}>
        <Row>
          <Col lg="2" className="sideNav">
            <Form>
              <ListGroup>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="shirt"
                    value={"all"}
                    onChange={e => setBrand({ brand: e.target.value })}
                  />
                  <span className="sideBar">ALL</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="shirt"
                    value={"Dillinger"}
                    onChange={e => setBrand({ brand: e.target.value })}
                  />
                  <span className="sideBar">Dillinger</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="shirt"
                    value={"Road star"}
                    onChange={e => setBrand({ brand: e.target.value })}
                  />
                  <span className="sideBar">Road star</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="shirt"
                    value={"Here & Now"}
                    onChange={e => setBrand({ brand: e.target.value })}
                  />
                  <span className="sideBar">Here & Now</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="shirt"
                    value={"Rigo"}
                    onChange={e => setBrand({ brand: e.target.value })}
                  />
                  <span className="sideBar">Rigo</span>
                </ListGroupItem>
              </ListGroup>
              <hr />
              {/* Size */}
              <ListGroup>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="size"
                    value={"S"}
                    onChange={e => setSize({ size: e.target.value })}
                  />
                  <span className="sideBar">S</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="size"
                    value={"M"}
                    onChange={e => setSize({ size: e.target.value })}
                  />
                  <span className="sideBar">M</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="size"
                    value={"L"}
                    onChange={e => setSize({ size: e.target.value })}
                  />
                  <span className="sideBar">L</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="size"
                    value={"XL"}
                    onChange={e => setSize({ size: e.target.value })}
                  />
                  <span className="sideBar">XL</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="size"
                    value={"XXL"}
                    onChange={e => setSize({ size: e.target.value })}
                  />
                  <span className="sideBar">XXL</span>
                </ListGroupItem>
              </ListGroup>
              <hr />
              {/* Rate */}
              <ListGroup>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="Rate"
                    onChange={e => setRate({ Rate: [100, 500] })}
                  />
                  <span className="sideBar">100 to 500</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="Rate"
                    onChange={e => setRate({ Rate: [500, 1000] })}
                  />
                  <span className="sideBar">500 to 1000</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="Rate"
                    onChange={e => setRate({ Rate: [1000, 2000] })}
                  />
                  <span className="sideBar">1000 to 2000</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="Rate"
                    onChange={e => setRate({ Rate: [2000, 5000] })}
                  />
                  <span className="sideBar">2000 and 5000</span>
                </ListGroupItem>
                <ListGroupItem>
                  <input
                    type="radio"
                    name="Rate"
                    onChange={e => setRate({ Rate: [5000] })}
                  />
                  <span className="sideBar">5000 and Above</span>
                </ListGroupItem>
              </ListGroup>
            </Form>
          </Col>
          <Col lg="10" className="filterContainer">
            <Container fluid={true}>
              <Row className="galleryRow">{productSrc()}</Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Product;
