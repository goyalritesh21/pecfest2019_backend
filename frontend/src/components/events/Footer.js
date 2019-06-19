import React, { Component } from "react";
import "./Footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <p class="txt-railway">- Event Coordinators -</p>
        <br />
        <a href="https://www.facebook.com/bootsnipp">
          <i id="social-fb" class="fa fa-facebook-square fa-3x social" />
        </a>
        <a href="https://twitter.com/bootsnipp">
          <i id="social-tw" class="fa fa-twitter-square fa-3x social" />
        </a>
        <a href="https://plus.google.com/+Bootsnipp-page">
          <i id="social-gp" class="fa fa-google-plus-square fa-3x social" />
        </a>
        <a href="mailto:bootsnipp@gmail.com">
          <i id="social-em" class="fa fa-envelope-square fa-3x social" />
        </a>
      </div>
    );
  }
}

export default Footer;
