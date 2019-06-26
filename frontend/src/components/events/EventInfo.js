import React, {Component} from "react";
import PropTypes from "prop-types";
import "./EventInfo.css";
import {setEvent, loadEvent} from "../../actions/individualEvent";
import {connect} from 'react-redux';
import CountDownTimer from "./CountDownTimer";
import Description from "./Description";
import Footer from "./Footer";

class EventInfo extends Component {
    state = {
        event: null
    };

    static propTypes = {
        setEvent: PropTypes.func.isRequired,
        loadEvent: PropTypes.func.isRequired,
        event: PropTypes.object
    };

    componentDidMount() {
        this.props.loadEvent(this.props.match.params.eventId);
        const { event } = this.props;
        this.setState(() => ({
            event
        }));
    }

    render() {
        const { event } = this.state;

        return (
            <div className="card text-center">
                <div
                    className="card-header"
                    style={{padding: "0px", background: "transparent", margin: "0px"}}
                >
                    <h3
                        className="card-title display1"
                        style={{
                            fontFamily: "ZCOOL KuaiLe",
                            textShadow: "4px 4px 4px #aaa",
                            fontSize: 70,
                            color: "#ff0066"
                        }}
                    >
                        {event.name}
                    </h3>
                </div>
                <div className="card-body">
                    <div className="form">
                        <CountDownTimer startDate={Date()}/>
                        <Description/>
                    </div>
                </div>
                <div className="card-footer" style={{background: "white"}}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.individualEvent.event
});

export default connect(mapStateToProps, {setEvent, loadEvent})(EventInfo);
