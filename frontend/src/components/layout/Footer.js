import React, {Component, Fragment} from 'react';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center"}>
                    <a href={"#"} className={"icon-3d"}>
                        <i className="fab fa-twitter fa-3x"/></a>
                    <a href={"#"} className={"icon-3d"}>
                        <i className="fab fa-facebook fa-3x"/></a>
                    <a href={"#"} className={"icon-3d"}>
                        <i className="fab fa-instagram fa-3x"/></a>
                    <a href={"#"} className={"icon-3d"}>
                        <i className="fab fa-youtube fa-3x"/></a>
                </div>
            </Fragment>
        );
    }
}

export default Footer;