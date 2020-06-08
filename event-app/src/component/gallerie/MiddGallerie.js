// import React, { Component } from "react";
// import "./middgallerie.css";
// import Carousel from "../carousel/carousel";
// export default class Middgallerie extends Component {
//   render() {
//     return (
//
//     );
//   }
// }

import React from "react";
// import Navbar from "../Nvbar/Navbar";
import NavApp from "../nav-app/NavApp";
import Iframe from "react-iframe";
import Carousel from "./Carousel";
import { Player } from "video-react";
import "./MiddGallerie.css";
import Footer from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import { Row, Container, Col } from "react-bootstrap";
const MiddGallerie = (props) => {
  return (
    <div>
      <NavApp navBg={props.location.pathname} />

      <div className="container-fuild">
        <div className="section-MyHeader">
          <h2>Gallery</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 VideoAuto">
            <Iframe
              url="https://www.youtube.com/embed/3aDzDy28DQc?autoplay=1"
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="videoAutoIframe"
            />
          </div>
        </div>
      </div>

      <Container id="video" fluid={true}>
        <Row>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div className="text">
              descriptiondzzzzzzzzzzzzzzzzdazzzzzz
              <br />
              zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
              descriptiondzzzzzzzzzzzzzzzzdazzzzzz
              <br />
              zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
          <Col xs={12} sm={12} md={4} className="video-gallery">
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              playsInline
              // poster="/assets/poster.png"
            />
            <div>description</div>
          </Col>
        </Row>
      </Container>
      <Carousel />
      <BackToTop />
      <Footer />
    </div>
  );
};

export default MiddGallerie;
