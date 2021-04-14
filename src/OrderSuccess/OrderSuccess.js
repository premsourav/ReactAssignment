import React, { Component } from "react";
import "./OrderSuccess.css";

import thumbsUp from "../Images/thumbs-up.png";
import LogoBW from "../Images/logobw.png";
import avatar from "../Images/avatar.png";

class OrderSuccess extends Component {
  state = {
    price: 0,
    orderDetails: [],
  };
  componentDidMount() {
    // console.log("ssssssssssssss", this.props.location.state);
    let newarr = [];

    this.props.location.state.foodQuantityAndPrice.map((item, index) => {
      // console.log("--------- ", item);
      if (item.foodQuantity !== 0) {
        let name = item.foodName;
        let quant = item.foodQuantity;
        let price = item.foodPrice;

        newarr.push({
          foodName: name,
          foodPrice: price,
          foodQuantity: quant,
        });
      }
    });
    console.log("newaee", newarr);
    this.setState({ orderDetails: newarr });
    this.setState({ price: this.props.location.state.totalPrice });
  }

  onClickAvatar = () => {
    this.props.history.push("/orderhistory");
  };

  render() {
    // console.log(this.props.location.state);
    console.log(this.state.orderDetails);
    console.log("--", this.state.orderDetails[0]);

    let mountComponent = null;
    if (this.state.price !== 0) {
      mountComponent = (
        <div>
          {this.state.orderDetails.map((item, index) => {
            let price = parseInt(item.foodPrice);
            let quant = item.foodQuantity;
            let amount = price * quant;
            return (
              <div>
                <div>
                  <div className="orderedName">{item.foodName}</div>
                  <div className="orderedPrice">Rs {amount}</div>
                </div>
                <div className="orderedQuantity">Quantity: {quant}</div>
              </div>
            );
          })}
          <div>
            <p className="referenceID">
              Reference ID: {this.props.location.state.referenceId}
            </p>
            <p className="totalPayable">Total Amount : {this.state.price}</p>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
          <div className="fixedHeader">
            <img src={LogoBW} className="logoBW" alt="LogoBW" />
            <img
              src={avatar}
              className="avatar"
              alt="avatar"
              onClick={this.onClickAvatar}
            />
          </div>
          <div className="card">
            <img src={thumbsUp} className="thumbsSuccess" alt="ThumbsUp" />
            {mountComponent}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderSuccess;
