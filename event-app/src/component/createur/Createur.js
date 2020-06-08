import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Createur.css";
import Image from "./CreateurImage";
import Titre from "../titre/Titre";
const Createur = (props) => {
  return (
    <Container id="organisateure" className="MyContainer">
      <Titre />
      <Row className="MyRowCss">
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
        <Col className="MyCol" xs={12} md={6} lg={4}>
          <Image />
        </Col>
      </Row>
    </Container>
  );
};

export default Createur;
