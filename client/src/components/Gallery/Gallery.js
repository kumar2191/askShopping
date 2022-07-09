import React from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import GalleryCard from '../Card/GalleryCard';
import './galleryCompo.css';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgs: [] };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/gallery")
      .then(res => {
        this.setState({ imgs: res.data });
      })
      .catch(err => console.error(err));
  }

  gallerySrc() {
     return this.state.imgs.map((data, i) => {
        return (
          <Col lg="3">
            <GalleryCard
              src={data.galleryImage}
              title={data.galleryTitle}
              subtitle={data.gallerySubTitle}
              link={data.galleryLink}
              key={i}
            />
          </Col>
        );
    });
  }
  render() {
    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row className="galleryRow">
          {this.gallerySrc()}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Gallery;
