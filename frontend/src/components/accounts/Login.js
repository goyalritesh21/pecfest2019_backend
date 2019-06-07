import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './loginRegisterStyle.css';
export class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
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

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username.toLowerCase(), password);
    };

    render() {
        const {isAuthenticated, user} = this.props;
        if (isAuthenticated  ) {
            if(!user.firstTimer) {

                return <Redirect to="/"/>
            }
            else {
                return <Redirect to="/update"/>
            }
        }
        const { username, password } = this.state;
        return (
            <div className="col-md-6 m-auto upper-padding">
                <div className="mt-5 main">
                    <h2 className="text-center">Login</h2>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control input"
                                name="username"
                                onChange={this.onChange}
                                value={username}
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
                            <button type="submit" className="btn btn-slide">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);
