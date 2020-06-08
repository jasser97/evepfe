import React, { useEffect, useState } from "react";
import NavApp from "../nav-app/NavApp";
import Footer from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Events.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import PageviewIcon from "@material-ui/icons/Pageview";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getAllUsers, getAllAdherent } from "../../actions/authActions";
import { getEvents } from "../../actions/actions";

import Card from "./Card";

import ReactLoading from "react-loading";
const Evenements = ({ getEvents, location, events }) => {
  const [isLoading, setIsloading] = useState(false);
  const [users, SetUseres] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/all`);

      SetUseres(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/event/all`);
      SetUseres(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetch(`/api/users/all`)
      .then((res) => res.json())
      .then((json) => {
        getEvents();
        setIsloading(true);
      });
  }, [getEvents]);
  return (
    <div>
      {isLoading ? (
        <div>
          <div
            style={{
              marginTop: -19,
              minHeight: "100vh",
            }}
          >
            <NavApp navEvent={location.pathname} />

            <Container fluid={true} className="containerSerch">
              <input type="text" id="search-input" placeholder="Search..." />

              <PageviewIcon className="search-icon" />
            </Container>
            <Container className="myCont" fluid={true}>
              <Row>
                <Col xs={12}>
                  <div
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                    className="containerBts"
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      Sportif
                    </Button>
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      Educatif
                    </Button>
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      scientifique
                    </Button>
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      Musicale
                    </Button>
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      festivate
                    </Button>
                    <Button
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                    >
                      Artisanat
                    </Button>
                  </div>
                </Col>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Col xs={5} sm={8} md={12} className="Cardscss">
                    <Row>
                      {events.megreTable.map((el, i) => (
                        <Card data={el} key={i} />
                      ))}
                    </Row>
                  </Col>
                </div>
              </Row>
            </Container>
          </div>
          <Footer />
          <BackToTop />
        </div>
      ) : (
        <div
          style={{
            marginTop: "-100vh",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading
            users={users}
            type="balls"
            height={100}
            width={100}
            color="#f82249"
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.EventReducer,
  };
};

export default connect(mapStateToProps, {
  getEvents,
  getAllAdherent,

  getAllUsers,
})(Evenements);
