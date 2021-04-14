import React, { Component } from "react";
import "./OrderHistory.css";

import LogoBW from "../Images/logobw.png";
import avatar from "../Images/avatar.png";

class OrderHistory extends Component {
  state = {
    prevOrder: [],
    flag: 0,
  };

  componentDidMount() {
    let arr = [];
    fetch(
      "https://react-food-order-default-rtdb.firebaseio.com/OrderHistory.json",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("fetched data", res);
        let a = Object.keys(res);
        console.log(a);

        for (let i = 0; i < a.length; i++) {
          arr.push(res[a[i]]);
        }

        // let a = { arr };
        console.log("aobj", a);
        // console.log("aa", arr);
        let temp = [...this.state.prevOrder];
        let temp1 = this.state.flag;
        temp1++;
        temp = arr;
        this.setState({ prevOrder: temp, flag: temp1 });
      });
    // let a = { arr };
    // console.log("aobj", a);
    // console.log("aa", arr);
    // let temp = [...this.state.prevOrder];
    // let temp1 = this.state.flag;
    // temp1++;
    // temp = arr;
    // this.setState({ prevOrder: temp, flag: temp1 });
  }

  onClickLogo = () => {
    this.props.history.push("/landingpage");
  };

  render() {
    console.log("state", this.state);

    let mountComponent = null;
    if (this.state.flag !== 0) {
      <div>
        {
          (mountComponent = this.state.prevOrder.map((item, index) => {
            return (
              <div className="mountedClass">
                <div className="refDiv">
                  <p className="labelClass">Reference No</p>
                  <p className="valueClass">{item.RefNo}</p>
                </div>
                <div className="ordDiv">
                  <p className="labelClass">Order Date</p>
                  <p className="valueClass">{item.OrderDate}</p>
                </div>
                <div className="ordTDiv">
                  <p className="labelClass">Order Time</p>
                  <p className="valueClass">{item.OrderTime}</p>
                </div>
                <div className="amtDiv">
                  <p className="labelClass">Amount</p>
                  <p className="amountClass">{item.Amount}</p>
                </div>
              </div>
            );
          }))
        }
      </div>;
    }

    return (
      <React.Fragment>
        <div className="fixedHeader">
          <img
            src={LogoBW}
            className="logoBW"
            alt="LogoBW"
            onClick={this.onClickLogo}
          />
          <img
            src={avatar}
            className="avatar"
            alt="avatar"
            onClick={this.onClickAvatar}
          />
        </div>
        <div className="cardHistory">
          <p className="orderLabel">Order History</p>
          {mountComponent}
        </div>
      </React.Fragment>
    );
  }
}

export default OrderHistory;
