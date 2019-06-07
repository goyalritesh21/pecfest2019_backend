import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../components/Pages/Home';
import Sponsors from '../components/Pages/Sponsors';
import About from '../components/Pages/About';
import Events from '../components/Pages/Events';
import LoginPage from '../components/Pages/LoginPage';
import RegisterPage from '../components/Pages/RegisterPage';
import Megashows from '../components/Pages/Megashows';
import Background from '../components/layout/Background/Background';
import AlertTemplate from "react-alert-template-basic";
import Header from "../components/layout/Header";
import Alerts from "../components/layout/Alerts";
import {Provider as AlertProvider} from "react-alert";
import IndividualEvent from "../components/events/IndividualEvent";
import ExtraDetails from "../components/accounts/ExtraDetails";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { Link, Redirect } from 'react-router-dom';

const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

class AppRouter extends Component {

    render() {
        return (
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Background/>
                    <div className={"overlay-2"}>
                        <Header/>
                        <Alerts />
                        <div id={"page-wrap"} style={{width:"100%", height:"100%", position:"fixed", top:"0", left:"0"}}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/sponsors" component={Sponsors}/>
                                <Route exact path="/about" component={About}/>
                                <Route exact path={"/megashows"} component={Megashows}/>
                                <Route exact path={"/events"} component={Events}/>
                                <Route exact path={"/login"} component={LoginPage}/>
                                <Route exact path={"/register"} component={RegisterPage}/>
                                <Route exact path={"/event/:id"} component ={IndividualEvent}/>
                                <Route exact path={"/update"} component={ExtraDetails}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertProvider>
        );
    }
}

export default AppRouter;