import {
  GET_EVENTS,
  ERROR_GET_ALL_EVENTS,
  LIKE_EVENT,
  DSILIKE_EVENT,
  GET_EVENT_BY_Id,
  ERR_DSILIKE_EVENT,
  ERR_LIKE_EVENT,
  SUCESS_ADD_EVENT,
  ERROR_ADD_EVENT,
  CLEAR_ERROR_EVENT,
  GET_EVENTS_USER,
  ERR_GET_EVENTS,
  // GET_ALLEVENTS,
} from "./types";
import { getAllUsers, getAllAdherent } from "./authActions";
import { getAllEvents } from "./EventActions";
import axios from "axios";

export const getEvents = () => (dispatch) => {
  axios
    .get("/api/event/all")
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
      dispatch(getAllAdherent());
      dispatch(getAllEvents());
      dispatch(getAllUsers());
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GET_ALL_EVENTS,
      });
    });
};
export const LikeEvent = (id, UserId, idE) => (dispatch) => {
  axios
    .put(`/api/event/likeEvent/${id}`, UserId)
    .then((res) => {
      dispatch({
        type: LIKE_EVENT,
        payload: res.data,
      });
      dispatch(getEventById(idE));
    })
    .catch((err) => {
      dispatch({
        type: ERR_LIKE_EVENT,
        payload: err.response.data,
      });
    });
};

export const disLike = (id, UserId, idE) => (dispatch) => {
  axios
    .put(`/api/event/disLikeEvent/${id}`, UserId)
    .then((res) => {
      dispatch({
        type: DSILIKE_EVENT,
        payload: res.data,
      });
      dispatch(getEventById(idE));
    })
    .catch((err) => {
      dispatch({
        type: ERR_DSILIKE_EVENT,
        payload: err.response.data,
      });
    });
};

export const getEventById = (id) => (dispatch) => {
  axios
    .get(`/api/event/singleEvent/${id}`)
    .then((res) => {
      dispatch({
        type: GET_EVENT_BY_Id,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addEvent = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .post("/api/event", data, config)
    .then((res) => {
      dispatch({
        type: SUCESS_ADD_EVENT,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: ERROR_ADD_EVENT,
        payload: err.response.data,
      })
    );
};
export const getUserEvents = () => (dispatch) => {
  axios
    .get("/api/event")
    .then((res) => {
      dispatch({
        type: GET_EVENTS_USER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERR_GET_EVENTS,
        payload: err.response.data,
      })
    );
};

export const clearErrorEvent = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_EVENT,
  });
};
