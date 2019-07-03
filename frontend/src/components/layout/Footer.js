import React, {Component, Fragment} from 'react';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center social-networks bounce"}>
                    {/*<a href={"#"} className={"icon-3d"}>*/}
                    {/*<i className="fab fa-twitter fa-3x"/></a>*/}
                    {/*<a href={"#"} className={"icon-3d"}>*/}
                    {/*<i className="fab fa-facebook fa-3x"/></a>*/}
                    {/*<a href={"#"} className={"icon-3d"}>*/}
                    {/*<i className="fab fa-instagram fa-3x"/></a>*/}
                    {/*<a href={"#"} className={"icon-3d"}>*/}
                    {/*<i className="fab fa-youtube fa-3x"/></a>*/}
                    <a href={"#"}>
                        <i className={"fab fa-youtube fa-3x my-youtube"}/></a>
                    <a href={"#"}>
                        <i className="fab fa-facebook-square fa-3x my-facebook"/></a>
                    <a href={"#"}>
                        <i className="fab fa-instagram fa-3x my-instagram"/></a>

                </div>
            </Fragment>
        );
    }
}

export default Footer;