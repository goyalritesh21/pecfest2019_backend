import React, {Component} from "react";
import "./footer.scss";

class Footer extends Component {
    state = {};

    render() {
        return (
            <div className="container">
                <p className="txt-railway">- Event Coordinators -</p>
                <br/>
                <a href="https://www.facebook.com/bootsnipp">
                    <i id="social-fb" className="fab fa-facebook-square fa-3x social"/>
                </a>
                <a href="https://twitter.com/bootsnipp">
                    <i id="social-tw" className="fab fa-twitter-square fa-3x social"/>
                </a>
                <a href="https://plus.google.com/+Bootsnipp-page">
                    <i id="social-gp" className="fab fa-google-plus-square fa-3x social"/>
                </a>
                <a href="mailto:bootsnipp@gmail.com">
                    <i id="social-em" className="fa fa-envelope-square fa-3x social"/>
                </a>
            </div>
        );
    }
}

export default Footer;
