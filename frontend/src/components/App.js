import React, {Component} from 'react';
import AppRouter from '../routers/AppRouter';
import {loadUser} from '../actions/auth';
import store from "../store";
import Provider from "react-redux/es/components/Provider";
import AlertTemplate from "react-alert-template-basic";
import {HashRouter as Router} from "react-router-dom";
import Background from "./layout/Background/Background";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Alerts from "./layout/Alerts";
import {Provider as AlertProvider} from "react-alert";

const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Background/>
                        <div className={"overlay-2"}>
                            <Header/>
                            <Footer/>
                            <Alerts/>
                            <AppRouter/>

                        </div>
                    </Router>
                </AlertProvider>
            </Provider>

        );
    }
}

export default App;