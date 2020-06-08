import React, { Component } from "react";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Container, Col } from "react-bootstrap";
// import im from "../../images/carousel/1.jpg";
const photos = [
  {
    name: "photo1",
    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/Festivals-Tunisiens.jpg",
  },
  {
    name: "photo2",
    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/festival-de-couleurs.jpg",
  },
  {
    name: "photo3",

    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/Festivals-Tunisiens.jpg",
  },
  {
    name: "photo4",

    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/festival-de-couleurs.jpg",
  },
  {
    name: "photo5",

    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/Festivals-Tunisiens.jpg",
  },
  {
    name: "photo6",
    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/festival-de-couleurs.jpg",
  },
  {
    name: "photo7",

    url:
      "https://www.voyage-tunisie.info/wp-content/uploads/2017/12/Festivals-Tunisiens.jpg",
  },
];
export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinte: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: "slides",
    };
    return (
      <Container className="containerCarousel">
        <Row>
          <Col xs={12}>
            <Slider {...settings}>
              {photos.map((photo, id) => {
                console.log(photo.url);
                return (
                  <div key={id}>
                    <img
                      // width="1200px"
                      // height="550px"
                      alt="im"
                      src={photo.url}
                    />
                  </div>
                );
              })}
            </Slider>
          </Col>
        </Row>
      </Container>
    );
  }
}
