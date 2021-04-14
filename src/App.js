// import logo from "./logo.svg";
import React, { Component } from "react";
import Login from "./Login/Login";
import LandingPage from "./LandingPage/LandingPage";
import OrderSuccess from "./OrderSuccess/OrderSuccess";
import OrderHistory from "./OrderHistory/OrderHistory";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <h1>Hello World</h1>
      // // </div>
      // <BrowserRouter>
      //   <Switch>
      //     <Route exact path="/landingpage" component={LandingPage} />;
      //     <Route exact path="/" render={(routeProps) => <Login name="abc" />} />
      //   </Switch>
      <div>
        <Switch>
          <Route exact path="/landingpage" component={LandingPage} />;
          <Route exact path="/ordersuccess" component={OrderSuccess} />;
          <Route exact path="/orderhistory" component={OrderHistory} />;
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
      // </BrowserRouter>
    );
  }
}

export default App;
