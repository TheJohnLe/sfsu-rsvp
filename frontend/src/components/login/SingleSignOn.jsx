import React, { Component } from "react";
import Axios from "axios";
import "./SingleSignOn.css";

class SingleSignOn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      sess_key: "",
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  }

  handleLoginSubmit = (e) => {
    // Prevent the app from refreshing
    e.preventDefault();

    const { email, password } = this.state;

    const url = "http://localhost:5000/login";

    Axios.post(url, {
      email: email,
      password: password,
    }).then(
      (response) => {
        //console.log("response data", response.data);
        this.setState({
          sess_key: response.data,
        });

        this.handleSuccessfulLogin();
      },

      (error) => {
        console.log("error", error);
      }
    );
  };

  handleSuccessfulLogin = () => {
    let { sess_key } = this.state;
    this.setState({
      email: "",
      password: "",
    });

    this.props.handleLoginSuccess(sess_key);
  };

  handleEmailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="p-4 d-flex justify-content-center align-items-center">
        <div className="login-container p-4 d-flex flex-column align-items-center border border-primary bg-primary rounded">
          <h2 className="p-4 text-light text-center">
            Computer Science Advising
          </h2>
          <form
            className="d-flex flex-column"
            onSubmit={this.handleLoginSubmit}
          >
            <input
              className="my-2"
              name="email"
              type="email"
              placeholder=" Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              autoComplete="off"
              required
            />
            <input
              className="my-2 mb-4"
              name="password"
              type="password"
              placeholder=" Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
            <input
              className="m-4 btn-dark rounded"
              type="submit"
              label="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SingleSignOn;
