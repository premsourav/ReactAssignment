import React, { Component } from "react";
import "./Login.css";
import logo from "../Images/logo.png";
import bigLogo from "../Images/knife-and-fork.png";
import userImg from "../Images/user-icon.png";
import passwordImg from "../Images/password-icon.png";

// import { Route } from "react-router-dom";
// import LandingPage from "../LandingPage/LandingPage";
// import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    employeeId: "",
    password: "",
  };

  handleEmployeeIDChange = (eid) => {
    // console.log(eid.target.value);
    this.setState({ employeeId: eid.target.value });
  };

  handlePasswordChange = (password) => {
    // console.log(password.target.value);
    this.setState({ password: password.target.value });
  };

  onClickLogin = () => {
    // console.log("Login Pressed");
    // console.log(this.state);
    // this.props.history.push("/landingpage");
    console.log(this.props);
    let eid = this.state.employeeId;
    console.log("eid", eid);

    fetch("/Login?$employeeid=" + eid)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (
          data.employeeId === this.state.employeeId &&
          data.password === this.state.password
        ) {
          console.log("Login Successful");
          // <NavLink to="/landingpage" />;
          // <Route path="/landingpage" component={LandingPage} />;
          this.props.history.push("/landingpage");
          console.log(this.props);
        } else {
          alert("Incorrect Login Credentials. Please try again");
        }
      });
  };

  render() {
    console.log("--", this.props);
    console.log(this.state);
    return (
      <React.Fragment>
        <div>
          <img src={logo} className="logo" alt="Logo" />
          <img src={bigLogo} className="mainLogo" alt="MainLogo" />
        </div>
        <div className="rectangle">
          <h1 className="welcomeText">Welcome Back :)</h1>
          <h5 className="welcomeSubText">
            To order food, please login with you Employee ID and password
          </h5>
          <div className="smallRectangle1">
            <div style={{ width: "50%" }}>
              <img src={userImg} className="userImage" alt="UserImage" />
            </div>
            <div style={{ "margin-left": "25%", "margin-top": "-65px" }}>
              <p>Employee ID</p>
              <input
                type="text"
                id="eid"
                className="inputClass"
                onChange={this.handleEmployeeIDChange}
              />
            </div>
          </div>
          <div className="smallRectangle2">
            <div style={{ width: "50%" }}>
              <img
                src={passwordImg}
                className="userImage"
                alt="PasswordImage"
              />
            </div>
            <div style={{ "margin-left": "25%", "margin-top": "-65px" }}>
              <p>Password</p>
              <input
                type="password"
                id="password"
                className="inputClass"
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
          {/* <div className="loginBtn">
            <h1 className="loginText">Login Now</h1>
          </div> */}
          <button className="loginBtn" onClick={() => this.onClickLogin()}>
            Login Now
          </button>
        </div>
        {/* <Route path="/landingpage" component={LandingPage} />; */}
      </React.Fragment>
    );
  }
}

export default Login;
