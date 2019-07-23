import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCategory } from "../../actions/events";
import Profile from "../../../public/images/profile.jpg";
import Profile1 from "../../../public/images/profile1.jpg";
import Techback from "../../../public/images/techback.jpg";
import Cultback from "../../../public/images/cultback.jpg";
import Profile2 from "../../../public/images/profile2.jpg";
import Lectback from "../../../public/images/lectback.jpg";
import Profile3 from "../../../public/images/profile3.jpg";
import Workback from "../../../public/images/workback.jpg";
import { Link } from "react-router-dom";
import "./typesevent.scss";

class Types extends Component {
  state = {
    name: this.props.category,
    img: null,
    imgback: null
  };

  static propTypes = {
    category: PropTypes.string,
    setCategory: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { category } = this.props.match.params;
    if (category) {
      this.setState(() => ({
        name: category
      }));
    }
    this.props.setCategory(this.props.match.params.category);
    this.getImage();
  }

  getImage = () => {
    let { name } = this.state;
    // console.log(name, category);
    if (!name) {
      name = this.props.match.params.category;
    }
    if (name === "Technical") {
      this.setState(() => ({ img: Profile, imgback: Techback }));
    } else if (name === "Cultural") {
      this.setState(() => ({ img: Profile1, imgback: Cultback }));
    } else if (name === "Lecture") {
      this.setState(() => ({ img: Profile2, imgback: Lectback }));
    } else if (name === "Workshop") {
      this.setState(() => ({ img: Profile3, imgback: Workback }));
    }
  };

  render() {
    const { name, img, imgback } = this.state;
    return (
      <div>
        <div className="sidebar-menu hidden-xs hidden-sm">
          <div className="top-section">
            <div className="profile-image">
              <img src={img} alt="Technical" />
            </div>
            <h3 className="profile-title">Categories</h3>
            {/* <p className="profile-description">Pecfest</p> */}
          </div>
          <div className="main-navigation">
            <ul className="navigation">
              <li>
                <Link
                  to={{
                    pathname: "/event/tech_01",
                    state: {
                      startDate: new Date(),
                      name: "tech_01"
                    }
                  }}
                >
                  <i className="fa fa-paperclip" />
                  Category1
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/event/tech_02",
                    state: {
                      startDate: new Date(),
                      name: "tech_02"
                    }
                  }}
                >
                  <i className="fa fa-paperclip" />
                  Category2
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/event/tech_03",
                    state: {
                      startDate: new Date(),
                      name: "tech_03"
                    }
                  }}
                >
                  <i className="fa fa-paperclip" />
                  Category3
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/event/tech_04",
                    state: {
                      startDate: new Date(),
                      name: "tech_04"
                    }
                  }}
                >
                  <i className="fa fa-paperclip" />
                  Category4
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="banner-bg"
          id="top"
          style={{ backgroundImage: `url(${imgback})` }}
        >
          <div className="banner-overlay" />
          <div className="welcome-text">
            <h2>{name} Events | Pecfest</h2>
            <h5>The list of Events being held</h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.events.category
});

export default connect(
  mapStateToProps,
  { setCategory }
)(Types);
