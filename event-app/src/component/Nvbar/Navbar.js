import React, { Component } from "react";
import logo from "../../images/logo2.png";
import "./navbar.css";
import DrawerButton from "../SideDrawer/DrawerButton";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { connect } from "react-redux";
import { activeClass } from "../../actions/authActions";
import { setModel } from "../../actions/modelAction";
import { getAdhrent } from "../../actions/authActions";
import ReactLoading from "react-loading";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      scrolled: false,
      loading: false,
    };
    this.scrollToTp = this.scrollToTp.bind(this);
    this.scrollToApropos = this.scrollToApropos.bind(this);
    this.scrollToEvents = this.scrollToEvents.bind(this);
    this.scrollToOrganisateure = this.scrollToOrganisateure.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 150;
      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => this.setState({ loading: true }));
  }
  componentWillUnmount() {
    this.setState({ scrolled: false });
    this.setState({ scrolled: true });
  }
  scrollToTp() {
    scroll.scrollTo(-10);
    this.props.activeClass({
      acceuil: true,
      apropos: false,
      evnet: false,
      organisature: false,
    });
  }
  scrollToApropos() {
    scroll.scrollTo(500);

    this.props.activeClass({
      acceuil: false,
      apropos: true,
      evnet: false,
      organisature: false,
    });
  }

  scrollToEvents() {
    scroll.scrollTo(910);

    this.props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: true,
      organisature: false,
    });
  }

  scrollToOrganisateure() {
    scroll.scrollTo(1670);

    this.props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: false,
      organisature: true,
    });
  }

  render() {
    return (
      <div>
        {!this.state.loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type="balls"
              height={100}
              width={100}
              color="#f82249"
            />
          </div>
        ) : (
          <header
            className={
              this.state.scrolled ||
              this.props.navBg ||
              this.props.navEvent ||
              this.props.navBlog ||
              this.props.navContact
                ? "navbar scrolled"
                : "navbar "
            }
            style={{ position: "fixed" }}
          >
            <nav className="navbar-navigation">
              <div className="navbar-logo">
                <Link to="/">
                  <img src={logo} onClick={this.scrollToTp} alt="logo" />
                </Link>
              </div>

              <div className="navbar-items">
                <ul className="nav-menu">
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.acceuil
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link to="/" onClick={this.scrollToTp}>
                      ACCUEIL
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.apropos
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link to="/" onClick={this.scrollToApropos}>
                      À PROPOS
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.evnet
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link onClick={this.scrollToEvents} to="/">
                      ÉVÈNEMENTS PROCHE
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive &&
                      this.props.actvieState.organisature
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link
                      to="/"
                      duration={500}
                      onClick={this.scrollToOrganisateure}
                    >
                      ORGANISATEUR
                    </Link>
                  </li>
                  <li
                    className={this.props.navBg ? "menu-active" : "undefined"}
                  >
                    <Link to="/gallerie"> GALLERIE </Link>
                  </li>
                  <li
                    className={
                      this.props.navEvent ? "menu-active" : "undefined"
                    }
                  >
                    <Link to="/evenemet">EVENEMENTS</Link>
                  </li>
                  <li
                    className={
                      this.props.navContact ? "menu-active" : "undefined"
                    }
                  >
                    <Link to="/contact"> CONTACT </Link>
                  </li>
                  <li
                    className={this.props.navBlog ? "menu-active" : "undefined"}
                  >
                    <Link to="/blog"> BLOG </Link>
                  </li>
                  {this.props.isAuth.isAuthenticated === true ? (
                    this.props.isAuth.registred === true ? (
                      <li className="connexion">
                        <Link to={`/Profile/user/${this.props.isAuth.user.id}`}>
                          PROFILE
                        </Link>
                      </li>
                    ) : (
                      <li
                        className="connexion"
                        onClick={() => this.props.setModel()}
                      >
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
                    <li className="connexion">
                      <Link to="/sign-in">CONNEXION</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div
                style={{
                  marginLeft: -20,
                  marginTop: 7,
                }}
                className="not-visibal-button"
              >
                <DrawerButton click={this.props.DrawerClickHandler} />
              </div>
            </nav>
          </header>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    actvieState: state.classReducer,
    isAuth: state.auth,
  };
};

export default connect(mapStateToProps, { setModel, activeClass, getAdhrent })(
  Navbar
);
