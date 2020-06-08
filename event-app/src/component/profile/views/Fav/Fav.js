import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import "./favorite.css";

import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
// import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";

function FavoritePage({ user }) {
  const [Favorites, setFavorites] = useState([]);

  let variable = { userId: user };
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios.post("/api/fav/getFavoreEvent", variable).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      }
    });
  };

  const onClickDelete = (eventId, userId) => {
    const variables = {
      eventId: eventId,
      userId: userId,
    };
    axios.post("/api/fav/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchFavoredMovie();
      } else {
        alert("Failed to Remove From Favorite");
      }
    });
  };

  const renderTab = Favorites.map((el, i) => {
    const content = (
      <div>
        {el.eventImage ? (
          <img style={{ width: 300 }} src={`${el.eventImage}`} alt="event" />
        ) : (
          " no image"
        )}
      </div>
    );
    return (
      <tr key={i}>
        <Tooltip
          content={content}
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.eventTitle}
              </h5>
              <img
                style={{
                  width: 280,
                  height: 200,
                  marginTop: -7,
                  fontWeight: 500,
                }}
                src={`${el.eventImage}`}
                alt="event"
              />
            </div>
          }
        >
          <td>{el.eventTitle}</td>
        </Tooltip>
        <td>{el.startDate}</td>
        <td>
          <Button onClick={() => onClickDelete(el.eventId, el.userId)}>
            Retirer de la liste
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th> Titre </th>
            <th>Date</th>
            <th>Retirer des favoris</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(FavoritePage);
