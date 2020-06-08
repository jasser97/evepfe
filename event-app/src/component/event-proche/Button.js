import React, { Component } from "react";
import "./button.css";
import { Container, Row, Col } from "react-bootstrap/";
import Titre from "../titre/Titre";
export class Button extends Component {
  render() {
    return (
      <div>
        <Titre />
        <Container className="ContCss">
          <Row className="RowCss">
            <Col>
              <a href=".." className="active">
                AUJOURD'HUI
              </a>
            </Col>
            <Col>
              <a href="..">CETTE SEMAINE</a>
            </Col>
            <Col xs={12} lg={4} className="col3">
              <a href="..">CE MOIS-CI</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Button;

/* <div>
        <div className="  bts">
          <p>LES ÉVÈNEMENTS LE PLUS PROCHE</p>
          <div className="trait"></div>

          <ul>
            <li>
              <a className="col-md-4 " href="..">
                AUJOURD'HUI
              </a>
            </li>
            <li>
              <a className="col-md-4 " href="..">
                CETTE SEMAINE
              </a>
            </li>
            <li>
              <a className="col-md-4 " href="..">
                CE MOIS-CI
              </a>
            </li>
          </ul>
        </div>
      </div> */
