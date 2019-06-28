import React, {Component, Fragment} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class IndividualEvent extends Component {
    state = {
        key: "description"
    };

    render() {
        return (
            <div className={"row"}>
                <div className={"col-md-6"} style={{color:"white"}}>
                    <h1>Name of Event</h1>
                    <p>Brief About Event</p>
                </div>
                <div className={"col-md-6"}>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                               role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile"
                               role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact"
                               role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab"><h3 style={{color:"white"}}>This is Nav Home</h3>
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                             aria-labelledby="nav-profile-tab"><h3 style={{color:"white"}}>This is Nav Profile</h3>
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab"><h3 style={{color:"white"}}>This is Nav Contact</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndividualEvent;