import React from 'react';
import { Card,CardBody} from "reactstrap";
class GalleryCard extends React.Component{
  
    render(){
        return (
          <a href={this.props.link} className="galleryLink">
            <Card className="galleryCard">
              <img
                className="galleryImg"
                src= {this.props.src}
                alt="gallery"
              />
              <CardBody>
                <h3 className="galleryTitle">{this.props.title}</h3>
                <hr />
                <p className="gallerySubtitle">{this.props.subtitle}</p>
              </CardBody> 
            </Card>
            </a>
        );
    }
}

export default GalleryCard;