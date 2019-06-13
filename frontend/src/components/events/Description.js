import React, {Component} from "react";
import notes from "../../../public/images/notes.jpg";
import "./description.css";

class Description extends Component {
    state = {};

    render() {
        return (
            <section className="bg-info" id="services">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-60">
                                <p>Wanna Know More..?</p>
                                <h4>Event Description</h4>
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
                                <h4>Online Reservations</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="single_service service_right">
                                <img
                                    src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-2.png"
                                    alt=""
                                />
                                <h4>Popular Dishes</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="single_service service_right">
                                <img
                                    src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-3.png"
                                    alt=""
                                />
                                <h4>Online Order</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
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
                                <h4>24/7 Service</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="single_service">
                                <img
                                    src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-5.png"
                                    alt=""
                                />
                                <h4>Candle Light Dinner</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="single_service">
                                <img
                                    src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-6.png"
                                    alt=""
                                />
                                <h4>Special Local Foods</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Description;
