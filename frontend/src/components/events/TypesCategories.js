import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCategory, loadCategories, loadEvents} from "../../actions/events";
import Profile from '../../../public/images/profile.jpg';
import Profile1 from '../../../public/images/profile1.jpg';
import Techback from '../../../public/images/techback.jpg';
import Cultback from '../../../public/images/cultback.jpg';
import Profile2 from '../../../public/images/profile2.jpg';
import Lectback from '../../../public/images/lectback.jpg';
import Profile3 from '../../../public/images/profile3.jpg';
import Workback from '../../../public/images/workback.jpg';
import { categoryDict } from "../../data/events";
import "./typesevent.scss";

class Types extends Component {
    state = {
        name: this.props.category,
        img: null,
        imgback: null,
        categories: []
    };

    static propTypes = {
        category: PropTypes.string.isRequired,
        setCategory: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        loadCategories: PropTypes.func.isRequired,
        loadEvents: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired
    };

    componentDidMount() {
        const {category} = this.props.match.params;
        if (category) {
            this.setState(() => ({
                name: category
            }));
        }
        this.props.setCategory(category);
        this.props.loadCategories(categoryDict[category].toLowerCase());
        this.getImage();
    }

    loadCategoryEvents = (id) => {
        const subCategory = this.state.name + id;
        this.props.loadEvents(subCategory);
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
        const {name, img, imgback} = this.state;
        const {categories, events} = this.props;
        return (
            <div>
                <div className="sidebar-menu hidden-xs hidden-sm">
                    <div className="top-section">
                        <div className="profile-image">
                            <img src={img} alt="Technical"/>
                        </div>
                        <h3 className="profile-title">Categories</h3>
                        {/* <p className="profile-description">Pecfest</p> */}
                    </div>
                    <div className="main-navigation">
                        <ul className="navigation">
                            {categories.length > 0 && categories.map(([id, name]) => (
                                <li key={id}>
                                    <a onClick={() => this.loadCategoryEvents(id)}>
                                        <i className="fa fa-paperclip"/>{name}
                                    </a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>

                </div>


                <div className="banner-bg" id="top" style={{backgroundImage: `url(${imgback})`}}>
                    <div className="banner-overlay"/>
                    <div className="welcome-text">
                        <h2>{categoryDict[name]} Events | Pecfest</h2>
                        <h5>The list of Events being held</h5>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    category: state.events.category,
    categories: state.events.categories,
    events: state.events.events
});

export default connect(mapStateToProps, {setCategory, loadCategories, loadEvents})(Types);