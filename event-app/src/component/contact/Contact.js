import React from "react";
import NavApp from "../nav-app/NavApp";
import Fotter from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Contact.css";
import { Row, Container, Col, Form } from "react-bootstrap";
import Iframe from "react-iframe";
const Contact = (props) => {
  return (
    <div>
      <NavApp navContact={props.location.pathname} />
      <section id="contact" style={{ marginTop: "40px" }}>
        <Container className="container">
          <div className="section-header">
            <h2>CONTACTEZ NOUS</h2>
          </div>
          <div className=" contact-info">
            <Row>
              <Col md={4}>
                <div className="contact-address">
                  <i className="ion-ios-location-outline" />
                  <h3 id="adresse">ADRESSE</h3>
                  <address>.............</address>
                </div>
              </Col>
              <Col md={4} className="col-md-4">
                <div className="contact-phone">
                  <i className="ion-ios-telephone-outline" />
                  <h3 style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                    TÉLÉPHONE
                  </h3>
                  <p>
                    <a href="tel:+21653045249">+216 53045249</a>
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="contact-email">
                  <i className="ion-ios-email-outline" />
                  <h3>E-MAIL</h3>
                  <p>
                    <a href="mailto:Cjasser580@gmail.com">
                      Cjasser580@gmail.com
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid={true} className="form">
          <Form className="contactForm ">
            <Row className="form-row ">
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da" }}
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Nom"
                />
              </Col>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da" }}
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=" E-mail"
                  data-rule="email"
                  data-msg="Veuillez saisir un e-mail valide"
                />
              </Col>
            </Row>
            <div className="form-group">
              <input
                style={{ border: "1px solid #ced4da" }}
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Sujet"
              />
            </div>
            <div className="form-group">
              <textarea
                style={{ border: "1px solid #ced4da" }}
                className="form-control"
                name="message"
                rows={5}
                id="message"
                defaultValue={""}
              />
              <Form.File
                style={{ marginTop: 15 }}
                id="custom-file"
                label="Choisir un fichier"
                custom
              />
              <div className="text-center">
                <button type="submit" style={{ height: "45px", marginTop: 20 }}>
                  <p id="button" style={{ fontSize: "15px" }}>
                    Envoyer Message
                  </p>
                </button>
              </div>
            </div>
          </Form>
        </Container>
      </section>
      <Container fluid={true}>
        <Row>
          <Col>
            <Iframe
              width="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.4883571612736!2d10.636119415115257!3d35.812492080163985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302756a7452317b%3A0xfe8bdcb107b21c72!2sInstitut%20Sup%C3%A9rieur%20des%20Sciences%20Appliqu%C3%A9es%20et%20de%20Technologie%20de%20Sousse!5e0!3m2!1sfr!2stn!4v1589028923913!5m2!1sfr!2stn"
              height="400"
            />
          </Col>
        </Row>
      </Container>
      <Fotter />
      <BackToTop />
    </div>
  );
};

export default Contact;
