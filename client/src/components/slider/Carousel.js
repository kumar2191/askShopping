import React, { Component } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import Image from '../imgaes/Image';
import './slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = { slider: [] };
    }

    componentDidMount(){
      axios.get("http://localhost:8080/slick")
        .then(res => {
          this.setState({ slider: res.data });
        })
        .catch(err => console.error(err));
    }

    imgSrc(){
      return this.state.slider.map((data,i) =>{
          return <div>
          <Image className="carousel-image" src={data.name} key={i}  />
          </div>
      });
    }
    render() {
        var settings = {
          dots: true,
          infinite: true,
          speed: 1800,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000
        };
        return (
          <Slider className="carousel-container" {...settings}>
              {this.imgSrc()}
          </Slider>
        );
    }
}

export default Carousel;
