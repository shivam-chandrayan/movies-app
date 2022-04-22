import React, { Component } from "react";
import axios from "axios";
import BookMovieItem from "./bookMovieItem";
import NavBar from "./navBar";

import { ReactComponent as MTicket } from "./mTicket.svg";
import { ReactComponent as Food } from "./food.svg";

class BookMovie extends Component {
  state = {
    data: { genre: "", showTiming: [] },
    dataBackup: {},
    dateIndex: 0,
    day: 0,
    like: [],
    filterPrice: [],
    filterTime: [],
  };

  async componentDidMount() {
    const { city, id } = this.props.match.params;
    const { data } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
        city +
        "/" +
        id
    );
    let d = new Date();
    let day = d.getDate();
    this.setState({ data, dataBackup: data, day });
  }

  buyTicket = (place, timing) => {
    let path = this.props.history.location.pathname;
    let param = this.state.dateIndex ? " June" : " Today";
    param = this.state.day + this.state.dateIndex + param;
    param = "?date=" + param;
    path =
      path + "/buyTicket/" + this.state.dateIndex + "/" + place + "/" + timing;
    this.props.history.push({ pathname: path, search: param });
  };

  handleLike = (index) => {
    let { like } = this.state;
    let i = like.findIndex((a) => a === index);
    if (i > -1) like.splice(i, 1);
    else like.push(index);
    this.setState({ like });
  };

  handleChange = (e) => {
    let { dataBackup, dateIndex, filterPrice } = this.state;
    let dataBackup1 = { ...dataBackup };
    if (e.currentTarget.checked) {
      let temp = e.currentTarget.value.split("-");
      filterPrice.push(temp);
    } else {
      let temp = e.currentTarget.value.split("-");
      let index = filterPrice.findIndex((a) => a[0] === temp[0]);
      filterPrice.splice(index, 1);
    }
    if (filterPrice.length !== 0)
      dataBackup1.showTiming[dateIndex] = dataBackup1.showTiming[dateIndex].map(
        function (a) {
          let obj = { ...a };
          obj.timings = a.timings.filter(
            (b) =>
              b.price >= Number(filterPrice[0][0]) &&
              b.price <= Number(filterPrice[0][1])
          );
          return obj;
        }
      );
    this.setState({ filterPrice, data: dataBackup1 });
  };

  handleChange1 = (e) => {
    let { data, dateIndex, filterTime } = this.state;
    if (e.currentTarget.checked) {
      let temp = e.currentTarget.value.split("-");
      filterTime.push(temp);
    } else {
      let temp = e.currentTarget.value.split("-");
      let index = filterTime.findIndex((a) => a[0] === temp[0]);
      filterTime.splice(index, 1);
    }
    this.setState({ filterTime });
  };

  handleSearch = (q) => {
    let city = this.props.match.params.city;
    this.props.history.push("/home/" + city + "?q=" + q);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar onSearch={this.handleSearch} />
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-12 pt-4 px-2 bg-secondary "
              style={{ color: "white" }}
            >
              <h3>{this.state.data.title}</h3>
              <div>
                <i className="fas fa-heart text-danger mx-1"></i>
                <h5 className="d-inline">{this.state.data.rating}</h5>
                {this.state.data.genre.split(",").map((a, i) => (
                  <button
                    className="btn btn-outline-light m-2 btn-sm"
                    style={{ borderRadius: "15px" }}
                    disabled={true}
                    key={i}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: "12px" }}>
                {this.state.data.votes} votes
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-lg-5 bg-light p-3">
              <h6>
                <strong
                  className="p-2 m-3"
                  style={
                    this.state.dateIndex === 0
                      ? { cursor: "pointer", background: "#2dc492" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => this.setState({ dateIndex: 0 })}
                >
                  {this.state.day} TODAY
                </strong>
                <strong
                  className="p-2 m-3"
                  style={
                    this.state.dateIndex === 1
                      ? { cursor: "pointer", background: "#2dc492" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => this.setState({ dateIndex: 1 })}
                >
                  {this.state.day + 1} JUNE
                </strong>
                <strong
                  className="p-2 m-3"
                  style={
                    this.state.dateIndex === 2
                      ? { cursor: "pointer", background: "#2dc492" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => this.setState({ dateIndex: 2 })}
                >
                  {this.state.day + 2} JUNE
                </strong>
              </h6>
            </div>
            <div className="col-3 col-lg-2 border-right bg-light">
              <span className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="#"
                  id="dropdown03"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Filter Price
                </a>
                <div
                  className="dropdown-menu px-2"
                  aria-labelledby="dropdown03"
                >
                  <input
                    type="checkbox"
                    value="101-200"
                    onChange={this.handleChange}
                  />{" "}
                  Rs. 101-200 <br />
                  <input
                    type="checkbox"
                    value="201-300"
                    onChange={this.handleChange}
                  />{" "}
                  Rs. 201-300 <br />
                  <input
                    type="checkbox"
                    value="301-350"
                    onChange={this.handleChange}
                  />{" "}
                  Rs. 301-350
                </div>
              </span>
            </div>
            <div className="col-3 col-lg-2 border-right bg-light">
              <span className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="#"
                  id="dropdown04"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Filter Showtime
                </a>
                <div
                  className="dropdown-menu px-2"
                  aria-labelledby="dropdown03"
                >
                  <input
                    type="checkbox"
                    value="12:00 AM-11:59 AM"
                    onChange={this.handleChange1}
                  />{" "}
                  Morning <br />
                  <input
                    type="checkbox"
                    value="12:00 PM-3:59 PM"
                    onChange={this.handleChange1}
                  />{" "}
                  Afternoon <br />
                  <input
                    type="checkbox"
                    value="4:00 PM-6:59 PM"
                    onChange={this.handleChange1}
                  />{" "}
                  Evening <br />
                  <input
                    type="checkbox"
                    value="7:00 PM-11:59 PM"
                    onChange={this.handleChange1}
                  />{" "}
                  Night
                </div>
              </span>
            </div>
            <div className="col-3 border-right bg-light"></div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="row">
                <div
                  className="col-6 px-4 border"
                  style={{ background: "#F5BFA9" }}
                >
                  <MTicket />
                  <p>M-Ticket Available</p>
                </div>
                <div
                  className="col-6 px-4 border"
                  style={{ background: "#F5BFA9" }}
                >
                  <Food />
                  <p>Food Available</p>
                </div>
              </div>
              {this.state.data.showTiming.length !== 0
                ? this.state.data.showTiming[
                    this.state.dateIndex
                  ].map((a, i) => (
                    <BookMovieItem
                      showTimingDetails={a}
                      key={i}
                      place={i}
                      buyTicket={this.buyTicket}
                      like={this.state.like}
                      onLike={this.handleLike}
                    />
                  ))
                : ""}
            </div>
            <div className="col-2 d-none d-lg-block">
              <img
                src="https://i.ibb.co/JqbbCJz/1331654202504679967.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookMovie;
