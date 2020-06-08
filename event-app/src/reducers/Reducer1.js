import {
  GET_EVENTS,
  LIKE_EVENT,
  ERR_LIKE_EVENT,
  DSILIKE_EVENT,
  ERR_DSILIKE_EVENT,
  GET_EVENT_BY_Id,
  SUCESS_ADD_EVENT,
  GET_EVENTS_USER,
} from "../actions/types";
const initialState = {
  allEvents: [],
  event: {},
  err: [],
  events: [],
  EventsAdherent: [],
  likes: 0,
};
const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };
    case LIKE_EVENT:
      return {
        ...state,
        likes: action.payload,
      };
    case ERR_LIKE_EVENT:
      return {
        ...state,
        err: state.err.concat(action.payload),
      };
    case DSILIKE_EVENT:
      return {
        ...state,
        dislikes: action.payload,
      };
    case ERR_DSILIKE_EVENT:
      return {
        ...state,
        err: state.err.concat(action.payload),
      };
    case GET_EVENT_BY_Id:
      return {
        ...state,
        event: action.payload,
      };

    case SUCESS_ADD_EVENT:
      return {
        ...state,
        events: action.payload && alert("l'événement a été ajouté"),
      };
    case GET_EVENTS_USER:
      return {
        ...state,
        EventsAdherent: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer1;
