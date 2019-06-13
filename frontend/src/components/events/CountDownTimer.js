import React, {Component} from "react";
import {PropTypes} from "prop-types";

class CountDownTimer extends Component {
    static propTypes = {
        startDate: PropTypes.instanceOf(Date)
    };

    constructor(props) {
        super(props);
        this.state = {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    startTimer = (milliSeconds) => {
        let leftTime = milliSeconds - new Date().getTime();
        if (milliSeconds < 0) clearInterval(this.timer);
        let days = Math.floor(leftTime / (24 * 60 * 60 * 1000));
        let hours = Math.floor(
            (leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((leftTime % (1000 * 60)) / 1000);
        this.setState({days, hours, minutes, seconds});
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.startTimer(this.props.startDate.getTime());
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let {days, hours, minutes, seconds} = this.state;
        return (
            <table className="table">
                <tbody>
                <tr>
                    <td className="h2">{days}</td>
                    <td className="h2">{hours}</td>
                    <td className="h2">{minutes}</td>
                    <td className="h2">{seconds}</td>
                </tr>
                <tr>
                    <td>days</td>
                    <td>hours</td>
                    <td>minutes</td>
                    <td>seconds</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default CountDownTimer;
