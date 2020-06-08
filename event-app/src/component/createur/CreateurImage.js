import React, { Component } from "react";
import logo from "../../images/speakers/1.jpg";
import "./Image.css";
import logo1 from "../../images/social/fb.png";
import logo2 from "../../images/social/twit.png";
import logo3 from "../../images/social/in.png";
import logo4 from "../../images/social/g+.png";
export default class CreateurImage extends Component {
  render() {
    return (
      <div className="speaker">
        <img src={logo} alt="1" />
        <div className="details">
          <h3>
            <a href="speaker">Brenden Legros</a>
          </h3>
          <p>Quas alias incidunt</p>
          <div className="social">
            <a href="s">
              <img src={logo1} style={{ marginTop: -8.7 }} alt="fb" />
            </a>
            <a href="1">
              <img style={{ height: 25 }} src={logo2} alt="twt" />
            </a>
            <a href="s">
              <img src={logo3} style={{ height: 35, width: 27 }} alt="in" />
            </a>
            <a href="g+">
              <img
                src={logo4}
                style={{
                  height: 35,
                  width: 27,
                  marginLeft: -1.5
                }}
                alt="l1"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
