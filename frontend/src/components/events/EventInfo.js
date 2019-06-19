import React, {Component} from "react";
import PropTypes from "prop-types";
import "./EventInfo.css";
import CountDownTimer from "./CountDownTimer";
import Description from "./Description";
import Footer from "./Footer";

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            eventId: undefined,
            startDate: undefined
        };
    }

    componentDidMount() {
        this.setState(() => ({
            name: this.props.location.state.name,
            eventId: this.props.match.params.id,
            startDate: this.props.location.state.startDate
        }))
    }

    render() {
        const {startDate, name} = this.state;

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
                        {name}
                    </h3>
                </div>
                <div className="card-body">
                    <div className="form">
                        <CountDownTimer startDate={startDate}/>

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

export default EventInfo;
