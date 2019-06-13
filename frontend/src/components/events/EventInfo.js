import React, {Component} from "react";
import PropTypes from "prop-types";

import eventBackgroundImg from "../../../public/images/event_background.jpg";
import "./eventInfo.css";
import EventShow from "./EventShow";
import Description from "./Description";

class EventInfo extends Component {
    state = {};

    static propTypes = {
        startDate: PropTypes.instanceOf(Date)
    };

    render() {
        const {startDate, name} = this.props;

        return (
            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
                style={{height: "400px", padding: "0px"}}
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <EventShow
                            startDate={startDate}
                            eventBackgroundImg={eventBackgroundImg}
                            name={name}
                        />
                    </div>
                    <div className="carousel-item">
                        <Description/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="..." alt="Third slide"/>
                    </div>
                </div>
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default EventInfo;
