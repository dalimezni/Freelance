import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form noValidate onSubmit={this.onSubmit} autoComplete="off">
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                required
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                className={classnames("form-control", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />

              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                className={classnames("form-control", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
