import React, { Component } from "react";
import "./LandingPage.css";
// import { Dropdown, DropdownButton } from "react-bootstrap";

import LogoBW from "../Images/logobw.png";
import avatar from "../Images/avatar.png";

class LandingPage extends Component {
  state = {
    fetchedData: [],
    foodQuantityAndPrice: [],
    totalQuantity: 0,
    totalPrice: 0,
    todayDate: "",
    cutoffTime: "12:30PM",
    cutoffHour: 12,
    cutoffMin: 30,
    selectedMeal: "Lunch",
  };

  componentDidMount() {
    let todayDate = this.getTodayDate();
    let newarr = [];
    // let day = new Date().getDay();
    let day = 0;
    console.log(day);
    fetch(
      "https://react-food-order-default-rtdb.firebaseio.com/getMenu/" +
        this.state.selectedMeal +
        "/" +
        day +
        ".json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("fetched", data);
        this.setState({ fetchedData: data });
        data.results.map((item, index) => {
          // console.log("----", item);
          let fetchedName = item.name;
          let fetchedID = item.id;
          let fetchedPrice = item.price;
          let fetchedImg = item.img;
          newarr.push({
            foodID: fetchedID,
            foodName: fetchedName,
            foodPrice: fetchedPrice,
            foodImg: fetchedImg,
            foodQuantity: 0,
          });
        });
        // console.log("Newarr", newarr);
        this.setState({ foodQuantityAndPrice: newarr });
        this.setState({ todayDate: todayDate });
      });
  }

  getTodayDate = () => {
    let todayDate = new Date();
    let date = todayDate.getDate();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth();
    let day = todayDate.getDay();
    let monthVal, dayVal, suffix;

    switch (month) {
      case 0:
        monthVal = "January";
        break;
      case 1:
        monthVal = "February";
        break;
      case 2:
        monthVal = "March";
        break;
      case 3:
        monthVal = "April";
        break;
      case 4:
        monthVal = "May";
        break;
      case 5:
        monthVal = "June";
        break;
      case 6:
        monthVal = "July";
        break;
      case 7:
        monthVal = "August";
        break;
      case 8:
        monthVal = "September";
        break;
      case 9:
        monthVal = "October";
        break;
      case 10:
        monthVal = "November";
        break;
      case 11:
        monthVal = "December";
        break;
      default:
        console.log("Error");
    }

    switch (day) {
      case 0:
        dayVal = "Sunday";
        break;
      case 1:
        dayVal = "Monday";
        break;
      case 2:
        dayVal = "Tuesday";
        break;
      case 3:
        dayVal = "Wednesday";
        break;
      case 4:
        dayVal = "Thursday";
        break;
      case 5:
        dayVal = "Friday";
        break;
      case 6:
        dayVal = "Saturday";
        break;
      default:
        console.log("Error");
    }

    if (date > 3 && date < 21) {
      suffix = "th";
    } else {
      switch (date % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
      }
    }

    return dayVal + ", " + date + suffix + " " + monthVal + " " + year;
  };

  onClickOrder = () => {
    // this.props.history.push("/ordersuccess", {
    //   totalPrice: this.state.totalPrice,
    //   foodQuantityAndPrice: this.state.foodQuantityAndPrice,
    // });
    let currentTime = new Date();

    if (this.state.totalQuantity !== 0) {
      if (
        Date.parse(
          "01/01/2021 " +
            this.state.cutoffHour.toString() +
            ":" +
            this.state.cutoffMin.toString()
        ) >=
        Date.parse(
          "01/01/2021 " +
            currentTime.getHours().toString() +
            ":" +
            currentTime.getMinutes().toString()
        )
      ) {
        let today = new Date();
        let mon = today.getMonth();
        mon++;
        let strMon;
        let strHrs;
        let strMin;
        let ampm;

        if (mon < 10) {
          strMon = "0" + mon.toString();
        } else {
          strMon = mon.toString();
        }

        let orderDate =
          today.getDate().toString() +
          "/" +
          strMon +
          "/" +
          today.getFullYear().toString();

        if (today.getHours() < 12 && today.getHours() < 10) {
          strHrs = "0" + today.getHours().toString();
          ampm = "AM";
        } else if (today.getHours() < 12 && today.getHours() >= 10) {
          strHrs = today.getHours().toString();
          ampm = "AM";
        } else {
          strHrs = today.getHours().toString();
          ampm = "PM";
        }

        if (today.getMinutes() < 10) {
          strMin = "0" + today.getMinutes().toString();
        } else {
          strMin = today.getMinutes().toString();
        }

        let orderTime = strHrs + ":" + strMin + " " + ampm;

        let refID =
          "RF" + Math.floor(Math.random() * 100).toString() + strMin + strHrs;

        console.log("date", orderDate);
        console.log("Time", orderTime);
        console.log("Ref", refID);

        let payload = {
          RefNo: refID,
          OrderTime: orderTime,
          OrderDate: orderDate,
          Amount: this.state.totalPrice,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

        fetch(
          "https://react-food-order-default-rtdb.firebaseio.com/OrderHistory.json",
          requestOptions
        )
          .then((res) => res.json())
          .then((data) => {
            // this.setState({ person: data, loading: false });
            // console.log("Success");
            this.props.history.push("/ordersuccess", {
              totalPrice: this.state.totalPrice,
              foodQuantityAndPrice: this.state.foodQuantityAndPrice,
              referenceId: refID,
            });
          });
      } else {
        alert("Deadline passed");
      }
    } else {
      alert("Please Select some items first");
    }
  };

  handleDropdownChange = (event) => {
    // console.log(event.target.value);
    let selected = this.state.selectedMeal;
    selected = event.target.value;
    // this.setState({ selectedMeal: selected });
    // this.onChangeMeal();

    let cutoff = this.state.cutoffTime;
    let cutHour = this.state.cutoffHour;
    let cutMin = this.state.cutoffMin;
    let quantities = this.state.totalQuantity;
    let price = this.state.totalPrice;
    if (selected === "Snacks") {
      cutoff = "4:30PM";
      cutHour = 16;
      cutMin = 30;
      quantities = 0;
      price = 0;
    } else {
      cutoff = "12:30PM";
      cutHour = 12;
      cutMin = 30;
      quantities = 0;
      price = 0;
    }
    this.setState({
      cutoffTime: cutoff,
      selectedMeal: selected,
      cutoffHour: cutHour,
      cutoffMin: cutMin,
      totalQuantity: quantities,
      totalPrice: price,
    });

    let todayDate = this.getTodayDate();
    let newarr = [];
    // let day = new Date().getDay();
    let day = 0;
    fetch(
      "https://react-food-order-default-rtdb.firebaseio.com/getMenu/" +
        selected +
        "/" +
        day +
        ".json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("fetched", data);
        this.setState({ fetchedData: data });
        data.results.map((item, index) => {
          // console.log("----", item);
          let fetchedName = item.name;
          let fetchedID = item.id;
          let fetchedPrice = item.price;
          newarr.push({
            foodID: fetchedID,
            foodName: fetchedName,
            foodPrice: fetchedPrice,
            foodQuantity: 0,
          });
        });
        // console.log("Newarr", newarr);
        this.setState({ foodQuantityAndPrice: newarr });
        this.setState({ todayDate: todayDate });
      });
  };

  onClickMinus = (clickedIndex) => {
    // alert("hello");
    if (this.state.foodQuantityAndPrice[clickedIndex].foodQuantity > 0) {
      let quant = [...this.state.foodQuantityAndPrice];
      quant[clickedIndex].foodQuantity--;
      this.setState({ foodQuantityAndPrice: quant });

      let totalQuant = this.state.totalQuantity;
      totalQuant--;
      this.setState({ totalQuantity: totalQuant });

      let newData = [...this.state.foodQuantityAndPrice];
      let oldPrice = this.state.totalPrice;
      let price = parseInt(newData[clickedIndex].foodPrice);
      let sum = oldPrice - price;
      this.setState({ totalPrice: sum });
    }
  };

  onClickPlus = (clickedIndex) => {
    // alert(clickedIndex);
    let quant = [...this.state.foodQuantityAndPrice];
    quant[clickedIndex].foodQuantity++;
    this.setState({ foodQuantityAndPrice: quant });

    let totalQuant = this.state.totalQuantity;
    totalQuant++;
    this.setState({ totalQuantity: totalQuant });

    let newData = [...this.state.foodQuantityAndPrice];
    let oldPrice = this.state.totalPrice;
    let price = parseInt(newData[clickedIndex].foodPrice);
    let sum = oldPrice + price;
    this.setState({ totalPrice: sum });
  };

  onClickAvatar = () => {
    this.props.history.push("/orderhistory");
  };

  render() {
    // console.log("state", this.state.totalQuantity);
    // console.log(this.state.fetchedData.results);

    let mountComponent = null;
    if (
      this.state.fetchedData.results &&
      this.state.foodQuantityAndPrice.length !== 0
    ) {
      mountComponent = (
        <div>
          {this.state.fetchedData.results.map((item, index) => {
            return (
              <div>
                <div className="rectangleBg">
                  <img className="dummyImage" src={item.img} />
                  <p className="foodName">{item.name}</p>
                  <p className="foodPrice">Rs {item.price}</p>
                  <div className="buttonGroup">
                    <button
                      className="minusBtn"
                      onClick={() => this.onClickMinus(index)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="foodQuantity"
                      disabled
                      value={
                        this.state.foodQuantityAndPrice[index].foodQuantity
                      }
                    />
                    <button
                      className="plusBtn"
                      onClick={() => this.onClickPlus(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    console.log("state", this.state);

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
          <div className="fixedSecondaryHeader">
            <p className="todayDate">{this.state.todayDate}</p>
            {/* <p className="mealType">Lunch</p> */}
            <select
              name="a"
              id="aa"
              className="mealType"
              value={this.state.selectedMeal}
              onChange={this.handleDropdownChange}
            >
              <option value="Lunch">Lunch</option>
              <option value="Snacks">Snacks</option>
            </select>
            <p className="deadline1">Order before: {this.state.cutoffTime}</p>
          </div>
          <div className="contentMargin">{mountComponent}</div>
          <div className="fixedFooter">
            <p className="itemCount">{this.state.totalQuantity} Item(s)</p>
            <p className="totalAmount">
              Total Amount: Rs {this.state.totalPrice}
            </p>
            <button
              className="placeOrderBtn"
              onClick={() => this.onClickOrder()}
            >
              PLACE ORDER
            </button>
            {/* <p>Total Amount: Rs 105</p>
            <p>Place</p> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;
