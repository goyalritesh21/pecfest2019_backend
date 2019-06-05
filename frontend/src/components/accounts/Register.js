import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import './loginRegisterStyle.css';
export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        createMessage: PropTypes.func.isRequired,
        firstTimer: PropTypes.bool
    };

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        this.setState(() => ({ [key]: val }));
        if(key === 'username')
        {
            this.setState(() => ({username: val.toUpperCase()}));
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordsNotMatch: 'Passwords do not match.' })
        }
        else {
            const user = {username:username.toLowerCase(), email, password };
            this.props.register(user);
        }

    };

    render() {
        if (this.props.isAuthenticated  ) {
            if(!this.props.firstTimer) {
                return <Redirect to="/"/>
            }
            else {
                return <Redirect to="/update"/>
            }
        }
        const { username, email, password, password2 } = this.state;
        return (
            <div className="col-md-6 m-auto upper-padding-register">
                <div className="mt-5 main">
                    <h2 className="text-center">Register</h2>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control input"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control input"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-slide">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    firstTimer: state.auth.user.firstTimer
});

export default connect(mapStateToProps, { register, createMessage })(Register);
