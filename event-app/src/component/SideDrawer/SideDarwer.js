import React from "react";
import "./SideDrawer.css";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { activeClass } from "../../actions/authActions";
import { setModel } from "../../actions/modelAction";
const SideDrawer = (props) => {
  let DrawerClasses = "SideDrawer";
  if (props.side) {
    DrawerClasses = "SideDrawer open";
  }

  const scrollToTp = () => {
    scroll.scrollTo(-10);
    props.activeClass({
      acceuil: true,
      apropos: false,
      evnet: false,
      organisature: false,
    });
  };

  const scrollToApropos = () => {
    scroll.scrollTo(500);
    props.activeClass({
      acceuil: false,
      apropos: true,
      evnet: false,
      organisature: false,
    });
  };

  const scrollToEvents = () => {
    scroll.scrollTo(910);
    props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: true,
      organisature: false,
    });
  };

  const scrollToOrganisateure = () => {
    scroll.scrollTo(1670);
    props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: false,
      organisature: true,
    });
  };

  return (
    <nav className={DrawerClasses}>
      <ul>
        <li style={{ marginTop: 100 }}>
          <Link
            className={
              props.navActive && props.actvieState.acceuil
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToTp}
          >
            ACCUEIL
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.apropos
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToApropos}
          >
            À PROPOS
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.evnet
                ? "activeItem"
                : "undefined"
            }
            onClick={scrollToEvents}
            to="/"
          >
            ÉVÈNEMENTS PROCHE
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.organisature
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToOrganisateure}
          >
            ORGANISATEUR
          </Link>
        </li>

        <li>
          <Link
            className={props.navBg ? "activeItem" : "undefined"}
            to="/gallerie"
          >
            GALLERIE
          </Link>
        </li>

        <li>
          <Link
            className={props.navEvent ? "activeItem" : "undefined"}
            to="/evenemet"
          >
            ÉVÈNEMENT
          </Link>
        </li>
        <li>
          <Link
            className={props.navContact ? "activeItem" : "undefined"}
            to="/contact"
          >
            CONTACT
          </Link>
        </li>
        <li>
          <Link
            className={props.navBlog ? "activeItem" : "undefined"}
            to="/blog"
          >
            BLOG
          </Link>
        </li>
        {props.isAuth.isAuthenticated ? (
          props.isAuth.registred === true ? (
            <li className="connexionBt">
              <Link to={`/Profile/user/${props.isAuth.user.id}`}>PROFILE</Link>
            </li>
          ) : (
            <li className="connexionBt" onClick={() => props.setModel()}>
              <Link
                to="/"
                style={{
                  fontSize: "12px",
                  padding: "7px 8px",
                }}
              >
                Ajouter des évènements
              </Link>
            </li>
          )
        ) : (
          <li className="connexionBt">
            <Link to="/sign-in">CONNEXION</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth,
    actvieState: state.classReducer,
    side: state.modelReducer.side,
  };
};
export default connect(mapStateToProps, { activeClass, setModel })(SideDrawer);
