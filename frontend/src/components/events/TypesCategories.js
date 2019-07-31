import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCategory, loadCategories, loadEvents, clearEvents} from "../../actions/events";
import Profile from '../../../public/images/profile.jpg';
import Profile1 from '../../../public/images/profile1.jpg';
import Techback from '../../../public/images/techback.jpg';
import Cultback from '../../../public/images/cultback.jpg';
import Profile2 from '../../../public/images/profile2.jpg';
import Lectback from '../../../public/images/lectback.jpg';
import Profile3 from '../../../public/images/profile3.jpg';
import Workback from '../../../public/images/workback.jpg';
import {categoryDict} from "../../data/events";
import {Link} from 'react-router-dom';
import Loader from "../common/Loader";

class Types extends Component {
  state = {
    name: null,
    img: null,
    imgback: null,
    categories: []
  };

    static propTypes = {
        category: PropTypes.string,
        setCategory: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        loadCategories: PropTypes.func.isRequired,
        loadEvents: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        clearEvents: PropTypes.func.isRequired
    };

  constructor(props) {
    super(props);
    this.main = React.createRef();
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    if (category) {
      this.setState(() => ({
        name: category
      }));
    }
    this.props.setCategory(category);
    this.props.loadCategories(categoryDict[category].toLowerCase());
    this.getImage();
  }

  componentWillUnmount() {
    this.props.clearEvents();
  }

  loadCategoryEvents = id => {
    const subCategory = this.state.name + id;
    this.props.loadEvents(subCategory);
  };

  handleScroll = e => {
    e.preventDefault();
    const main = this.main.current;
    main.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  };

  getImage = () => {
    let {category} = this.state;
    if (!category) {
        category = this.props.match.params.category
    }
    if (category === 'tech') {
        this.setState(() => ({img: Profile, imgback: Techback}));
    }
    else if (category === 'cult') {
        this.setState(() => ({img: Profile1, imgback: Cultback}));
    }
    else if (category === 'lect') {
        this.setState(() => ({img: Profile2, imgback: Lectback}));
    }
    else if (category === 'work') {
        this.setState(() => ({img: Profile3, imgback: Workback}));
    }

};


  render() {
    const { name, img, imgback } = this.state;
    const { categories, events } = this.props;
    if (!categories) {
      return <Loader />;
    }
    return (
      <div className="main_div">
        <div className="sidebar-menu hidden-xs hidden-sm">
          <div className="top-section">
            <div className="profile-image">
              <img src={img} alt={categoryDict[name]} />
            </div>
            <h3 className="profile-title">Categories</h3>
            {/* <p className="profile-description">Pecfest</p> */}
          </div>
          <div className="main-navigation">
            <ul className="navigation">
              {categories.length > 0 &&
                categories.map(([id, name]) => (
                  <li key={id}>
                    <a onClick={() => this.loadCategoryEvents(id)}>
                      <i className="fa fa-paperclip" />{" "}
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <section id="landing-section">
          <div
            className="landing banner-bg"
            id="top"
            style={{ backgroundImage: `url(${imgback})` }}
          >
            <div
              className="banner-overlay"
              onClick={() => console.log("hello")}
            />
            <div className="logo">
              <h1>{categoryDict[name]} Events | Pecfest</h1>
              <h3>2K19</h3>
            </div>
            <div className="darkness" />
            {events.length > 0 && (
              <div onClick={this.handleScroll} id="scrollDown">
                <i className="fa fa-chevron-down fa-3x go-down" />
              </div>
            )}
          </div>
        

        {events.length > 0 ? (
          <section id="events-section" ref={this.main}>
            <div className="container">
              <div>
                <h2 className="headline-section wow jackInTheBox">EVENTS</h2>

                <div className="events">
                  {events.map(({ id, eventID, name }) => (
                    <div key={id} data-wow-duration="1s" className="event">
                      <Link to={`/event/${eventID}`}>
                        <div className="card">
                          <div className="card-item card-front">
                            <img
                              src="./img/events/techno_buzz_comp.jpg"
                              alt={name}
                            />
                            <div className="headText">
                              <p>{name}</p>
                            </div>
                          </div>
                          <div className="card-item card-back">
                            <img
                              src="./img/events/techno_buzz_comp.jpg"
                              alt={name}
                            />
                            <div className="eventName">
                              <p>{name}</p>
                            </div>
                            <div className="headText">
                              <p>Know More</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.events.category,
  categories: state.events.categories,
  events: state.events.events
});

export default connect(mapStateToProps, {setCategory, loadCategories, loadEvents, clearEvents})(Types);
