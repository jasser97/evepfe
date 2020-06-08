import React, { useState, useEffect } from "react";
import GridItem from "../profile/components@material/Grid/GridItem.js";
import GridContainer from "../profile/components@material/Grid/GridContainer.js";
// import queryString from "query-string";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import axios from "axios";
import NavApp from "../nav-app/NavApp";
import ChatIcon from "@material-ui/icons/Chat";
import BackToTop from "../Back-to-top/BackTop";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import "./details.css";

import Chat from "../Chat/Chat/Chat";
import ReactLoading from "react-loading";
import { Link, Route } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { LikeEvent, disLike, getEventById } from "../../actions/actions";
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(221, 220, 220)",
    padding: -20,
    marginTop: "51px",
    width: "100%",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  width: {
    width: "100%",
    backgroundColor: "rgb(236, 236, 236)",
    border: "none",
  },
});
// import ReactLoading from "react-loading";
function Details(props) {
  const [searchstar, setSearchstar] = useState({ rating: 5 });
  const onStarClicktwo = (nextValue, prevValue, name) => {
    setSearchstar({ rating: nextValue });
  };
  const [isLoading, setIsloading] = useState(false);
  const [userName, setuserName] = useState("");
  const [EventTitle, setEventTitle] = useState("");
  const [event, setEvent] = useState({});
  const [userId, setuserId] = useState({ id: "" });
  const [favNumber, setFavNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [Res, setRes] = useState(0);
  const [reserved, setReserved] = useState(false);
  const [variable, setVariable] = useState({
    userId: "",
    eventId: "",
    eventTitle: "",
    eventImage: "",
    startDate: "",
  });
  const classes = useStyles();

  useEffect(() => {});
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `/api/event/singleEvent/${props.match.params.id}`
      );

      setIsloading(true);
      setEvent(result.data);
      setVariable({
        userId: userId.id,
        eventId: event.id,
        eventTitle: event.Titre,
        eventImage: event.EventImage,
        startDate: event.Start_date,
      });
    };

    fetchData();
  }, [
    props.match.params.id,
    event.id,
    event.Titre,
    event.EventImage,
    event.Start_date,
    userId.id,
  ]);
  useEffect(() => {
    props.getEventById(props.match.params.id);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await axios(`/api/event/singleEvent/${props.match.params.id}`);
      if (props.user.isAuthenticated === true) {
        setEventTitle(event.Titre);
        setuserName(props.user.user.userName);
        setuserId({ id: props.user.user.id });
      }
    };

    fetchData();
  }, [
    props.user.user.id,
    props.user.isAuthenticated,
    props.user.user.userName,
    event.Titre,
    props.match.params.id,
    props.user.isAuthenticate,
  ]);

  const handleLike = () => {
    props.LikeEvent(event._id, userId, props.match.params.id);
  };

  const handleDisLike = () => {
    props.disLike(event._id, userId, props.match.params.id);
  };
  useEffect(() => {
    axios.post("/api/fav/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavNumber(response.data.favoriteNumber);
      }
    });
    axios.post("/api/fav/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      }
    });
  }, [variable]);
  const onClickfav = () => {
    if (favorited) {
      axios.post("/api/fav/removeFromFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavNumber(favNumber - 1);
          setFavorited(!favorited);
        }
      });
    } else {
      axios.post("/api/fav/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavNumber(favNumber + 1);
          setFavorited(!favorited);
        }
      });
    }
  };
  useEffect(() => {
    const variable = { eventId: event.id, userId: userId.id };
    axios.post("/api/reservation/reservationNumber", variable).then((res) => {
      if (res.data.success) {
        setRes(res.data.reservationNumber);
      }
    });
    axios.post("/api/reservation/reserved", variable).then((response) => {
      if (response.data.success) {
        setReserved(response.data.reservation);
      }
    });
  }, [userId.id, event.id]);

  const handleRes = () => {
    let variable = { eventId: event.id, userId: userId.id };
    if (reserved) {
      axios.post("/api/reservation/unReserve", variable).then((response) => {
        if (response.data.success) {
          setRes(Res - 1);
          setReserved(!reserved);
        } else {
          alert("failed to unreserve");
        }
      });
    } else {
      axios.post("/api/reservation/reserve", variable).then((response) => {
        if (response.data.success) {
          setRes(Res + 1);
          setReserved(!reserved);
        } else {
          alert("failed to reserve");
        }
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <GridContainer style={{ width: "99%", paddingLeft: 70 }}>
            <NavApp navEvent={props.location.pathname} />
            <GridItem style={{ marginTop: 85 }} xs={12} sm={12} md={12}>
              <div className="container py-5">
                <div style={{ marginLeft: "-80px" }} className="row">
                  <div>
                    <img
                      src={event.EventImage}
                      className="img-fluid"
                      alt="event"
                      style={{
                        height: "400px",
                        width: "3000px",
                        marginTop: "-50px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.2rem",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {event.Titre}
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontFamily: "gras",
                    fontSize: 20,
                    fontStyle: "italic",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ marginTop: 10 }}>Date debut:</span>
                  <span style={{ marginTop: 10 }}>Date fin:</span>
                </div>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    backgroundColor: "#f82249",
                    color: "white",
                    width: "60%",
                    marginTop: "10px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  {event.Type_event}
                </h2>
              </div>
            </GridItem>
            <GridItem
              style={{ marginTop: -40, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={4}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: `${reserved ? "#AAAAAA" : "#CC0000"}`,
                    borderRadius: 4,
                    color: "white",
                    padding: "8px 13px",
                    fontWeight: "500",
                    fontSize: "1rem",
                    marginLeft: -90,
                    marginRight: 30,
                    textTransform: "uppercase",
                  }}
                  onClick={handleRes}
                >
                  {reserved ? "Réservé" : "Reservation"} ({Res})
                </button>
                <StarRatingComponent
                  style={{ marginTop: "20px" }}
                  className="x"
                  name="rate1"
                  starCount={5}
                  value={searchstar.rating}
                  onStarClick={onStarClicktwo.bind(setSearchstar)}
                />
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <hr style={{ marginTop: -40, height: 15 }} />
            </GridItem>

            <GridItem
              style={{ marginTop: 13, marginBottom: 45 }}
              xs={12}
              sm={12}
              md={6}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    marginLeft: 15,
                    fontStyle: "gras",
                    fontSize: 20,
                    fontFamily: "italic",
                  }}
                >
                  Description :
                </p>
                <p
                  style={{
                    width: "100%",
                    margin: "auto",
                    padding: "10px",
                    fontSize: "1.2em",
                    color: "rgb(31, 31, 31)",
                    fontFamily: "italic",
                    wordWrap: "break-word",
                  }}
                >
                  {event.Description}
                </p>
              </div>
            </GridItem>

            <GridItem
              style={{
                marginTop: -40,
                marginBottom: 45,
                height: 300,
              }}
              xs={12}
              sm={6}
              md={3}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 51,
                }}
              >
                <img
                  style={{
                    height: 300,
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  src={event.EventImage}
                  alt="map"
                />
              </div>
            </GridItem>
            <GridItem
              style={{
                marginTop: -40,
                marginBottom: 45,
                height: 300,
              }}
              xs={12}
              sm={6}
              md={3}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  className={classes.root}
                  style={{ height: 300 }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      createure d evenement
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                      adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                      well meaning and kindly.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </GridItem>
            <GridItem style={{ marginTop: 30 }}>
              <ThumbUpIcon
                size="2rem"
                style={{
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
                onClick={handleLike}
              />
              <span> {props.event.event.Likes}</span>
              <ThumbDownIcon
                onClick={handleDisLike}
                size="2rem"
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />
              <span> {props.event.event.DisLikes}</span>

              <button
                onClick={onClickfav}
                style={{
                  backgroundColor: "rgba(6, 12, 34, 0.98)",
                  color: "white",
                  borderRadius: "10px",
                  borderColor: "transparent",
                  marginTop: "30px",
                  height: 40,
                  marginLeft: 30,
                  outline: "none",
                }}
              >
                {favorited ? "Supprimer de fav" : "Ajouter au Fav"} ({favNumber}
                )
              </button>
            </GridItem>
            <GridItem style={{ marginLeft: -70, marginBottom: 100 }} xs={12}>
              <div style={{ display: "flex", width: "100%" }}>
                <textarea
                  className="form-control"
                  placeholder="Ajouter un nouveau commentaire"
                  style={{
                    marginLeft: "70px",
                    width: "500px",
                    marginTop: "30px",
                    minWidth: 200,
                  }}
                ></textarea>
                <button
                  style={{
                    backgroundColor: "#f82249",
                    color: "white",
                    borderRadius: "10px",
                    borderColor: "transparent",
                    marginTop: "30px",
                    height: 60,
                    marginLeft: 30,
                    outline: "none",
                  }}
                >
                  comment
                </button>
              </div>
            </GridItem>
          </GridContainer>
          {props.user.isAuthenticated ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 140,
              }}
            >
              <Link
                onClick={(e) =>
                  !userName || !EventTitle ? e.preventDefault() : null
                }
                to={`/evenemet/${event.id}/chat/room=${EventTitle}&name=${userName}`}
              >
                <ChatIcon
                  style={{ fontSize: 60, position: "fixed", bottom: "1.2%" }}
                />
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 140,
              }}
            >
              <Link to={`/evenemet/${event.id}`}>
                <ChatIcon
                  style={{ fontSize: 60, position: "fixed", bottom: "1.2%" }}
                />
              </Link>
            </div>
          )}

          <Route
            path="/evenemet/:id/chat/:user"
            render={(props) => <Chat {...props} id={event.id} />}
          />
          <BackToTop />
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="balls" height={100} width={100} color="#f82249" />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    event: state.Reducer1,
    user: state.auth,
    loading: state.eventReducer,
  };
};
export default connect(mapStateToProps, { LikeEvent, disLike, getEventById })(
  Details
);
