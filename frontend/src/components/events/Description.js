import React, {Component} from "react";
import notes from "../../../public/images/notes.jpg";
import "./description.scss";
import DescriptionModal from "./DescriptionModal";

class Description extends Component {
    state = {};

    render() {
        return (
            <div className="container-fluid" id="services">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-title text-center mb-60">
                            <p> Wanna Know More..?</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="single_service service_right">
                            <img
                                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-1.png"
                                alt=""
                            />
                            <h4>Description</h4>

                            <DescriptionModal contentId="description"/>
                        </div>
                        <div className="single_service service_right">
                            <img
                                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-2.png"
                                alt=""
                            />
                            <h4>Rules</h4>
                            <DescriptionModal contentId="rules"/>
                        </div>
                        {/* <div className="single_service service_right">
              <img
                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-3.png"
                alt=""
              />
              
            </div> */}
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <div className="single_mid">
                            <img src={notes} alt=""/>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="single_service">
                            <img
                                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-4.png"
                                alt=""
                            />
                            <h4>Prizes</h4>
                            <DescriptionModal contentId="prizes"/>
                        </div>
                        <div className="single_service">
                            <img
                                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-5.png"
                                alt=""
                            />
                            <h4>Results</h4>
                            <DescriptionModal contentId="results"/>
                        </div>
                        {/* <div className="single_service">
              <img
                src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-6.png"
                alt=""
              />
              <h4>Special Local Foods</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Description;
