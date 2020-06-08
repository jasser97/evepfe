import React, { Component } from "react";
import "./EventsPr.css";
import logo from "../../images/speakers/1.jpg";
import { Container, Row, Col, Alert } from "react-bootstrap";

export default class EventsPr extends Component {
  render() {
    return (
      <div id="evenemetnsproche" className="BoxCon">
        <Alert className="box">
          <a href="jd">
            <Container>
              <Row>
                <Col xs={12} lg={2}>
                  <time>
                    10:00 AM
                    <br />
                    23/09/1997
                  </time>
                </Col>
                <Col className="description">
                  <img src={logo} alt="1" />
                  <div>
                    <h4> This is a modified jumbotron</h4>
                    <p>
                      that occupies the entire horizontal space of its
                      parent.This is a modified jumbotron that occupies the
                      entire horizontal
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </a>
        </Alert>
      </div>
    );
  }
}
