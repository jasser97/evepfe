import React from "react";
import Button from "./Button";
import EventsPr from "./EventsPr";
const EventsButtons = props => {
  return (
    <div style={{ backgroundColor: "#dbdbdbb6", paddingBottom: 40 }}>
      <Button />
      <EventsPr />
      <EventsPr />
      <EventsPr />
      <EventsPr />
    </div>
  );
};

export default EventsButtons;
