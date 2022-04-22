import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";
import "./bookTicket.css";
import BackBtn from "./backBtn";

class BuyTicket extends Component {
  state = {
    data: [],
    seatingData: [],
    time: ["9:00 AM", "12:00 AM", "1:15 PM", "3:45 PM", "10:20 PM", "11:35 PM"],
    recliner: [],
    gold: [],
    booked: [],
    day: "",
    place: "",
    timing: "",
    date: "",
  };
  async componentDidMount() {
    let { city, id, day, place, timing } = this.props.match.params;
    const { data } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
        city +
        "/" +
        id
    );
    let time = data.showTiming[day][place].timings;
    time = time.map((a) => a.name);
    let { data: seatingData } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seats"
    );
    seatingData = [...seatingData, ...seatingData, ...seatingData];

    console.log(this.props.match.params);
    console.log("movieData", data);
    console.log("seatingData:", seatingData);

    let recliner = seatingData[timing].seats.filter((a) => a.price === 420);
    let gold = seatingData[timing].seats.filter((a) => a.price === 250);
    let { date } = queryString.parse(this.props.location.search);
    this.setState({
      data,
      seatingData,
      time,
      day,
      place,
      timing,
      recliner,
      gold,
      date,
    });
  }

  bookTickets = async () => {
    let url = "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seat";
    let { day, place } = this.props.match.params;
    let tickets = this.state.booked.map((a) => a.row + a.seatNo);
    let data = {
      title: this.state.data.title,
      movieHall: this.state.data.showTiming[day][place].name,
      tickets: tickets,
      amount: this.state.booked.reduce((a, c) => a + c.price, 0),
      time: this.state.time[this.state.timing],
      date: this.state.date.substring(0, 3),
    };
    let res = await axios.post(url, data);
    if (res.status === 200) this.props.history.push("/payment");
  };

  setTime = (index) => {
    let { seatingData } = this.state;
    let recliner = seatingData[index].seats.filter((a) => a.price === 420);
    let gold = seatingData[index].seats.filter((a) => a.price === 250);
    this.setState({ timing: index, recliner, gold, booked: [] });
  };

  selectSeat = (index, row, cat) => {
    let booked = [...this.state.booked];
    let { recliner, gold } = this.state;
    if (cat === "recliner") {
      const i = booked.findIndex(
        (a) => a.type === cat && a.row === row && a.seatNo === index
      );
      if (i === -1) {
        for (let i = 0; i < recliner.length; i++) {
          if (recliner[i].rowName === row) {
            recliner[i].seatList[index - 1].booked = true;
          }
        }

        let obj = { price: 420, row: row, type: cat, seatNo: index };
        booked.push(obj);
      } else {
        for (let i = 0; i < recliner.length; i++) {
          if (recliner[i].rowName === row) {
            recliner[i].seatList[index - 1].booked = false;
          }
        }

        booked.splice(i, 1);
      }
    } else {
      const i = booked.findIndex(
        (a) => a.type === cat && a.row === row && a.seatNo === index
      );
      if (i === -1) {
        for (let i = 0; i < gold.length; i++) {
          if (gold[i].rowName === row) {
            gold[i].seatList[index - 1].booked = true;
          }
        }

        let obj = { price: 420, row: row, type: cat, seatNo: index };
        booked.push(obj);
      } else {
        for (let i = 0; i < gold.length; i++) {
          if (gold[i].rowName === row) {
            gold[i].seatList[index - 1].booked = false;
          }
        }

        booked.splice(i, 1);
      }
    }
    this.setState({ recliner, gold, booked });
  };

  render() {
    let { city, id } = this.props.match.params;
    let { day, place, time, recliner, gold, timing, date } = this.state;
    let backUrl = "/bookMovie/" + city + "/" + id;
    return (
      <div className="container-fluid">
        {this.state.data.length !== 0 ? (
          <div>
            <div className="row">
              <div className="col-12">
                <div className="row bg-dark">
                  <BackBtn />
                  <div className="col-11 p-3" style={{ color: "white" }}>
                    <span
                      style={{
                        fontSize: "25px",
                        width: "100%",
                        display: "block",
                      }}
                    >
                      {this.state.data.title}
                    </span>
                    <span
                      className="float-right d-none d-lg-block"
                      onClick={() => this.props.history.push(backUrl)}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                    <span className="float-right mx-4 px-4 d-none d-lg-block">
                      {this.state.booked.length} Tickets
                    </span>

                    {this.state.data.showTiming[day][place].name}
                  </div>
                </div>
              </div>
              <div className="col-12 bg-light p-3">
                {date}, {time[timing]} <br />
                {time.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => this.setTime(i)}
                    className={
                      i == timing
                        ? "btn btn-outline-success m-2 btn-sm active"
                        : "btn btn-outline-success m-2 btn-sm"
                    }
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="row pb-2 ml-4 mr-4 no gutters">
                <div className="col text-secondary text-left border-bottom">
                  RECLINER - RS 420.00
                </div>
              </div>
              <div>
                {recliner.map((a, i) => (
                  <div className="row ml-4 mr-4 no-gutters" key={i}>
                    <div className="col-1 text-right mr-1">{a.rowName}</div>
                    <div className="col-10 text-left">
                      <div
                        style={{
                          marginLeft: "1",
                          marginRight: "1",
                          marginTop: "1",
                          marginBottom: "1",
                          float: "left",
                          width: "19",
                          height: "19",
                        }}
                      >
                        {a.seatList.map((b) => (
                          <button
                            key={b.seatNo}
                            onClick={() =>
                              this.selectSeat(b.seatNo, a.rowName, "recliner")
                            }
                            style={{
                              display: "inline-block",
                              fontSize: "10px",
                              textAlign: "center",
                              width: "21px",
                              height: "21px",
                              borderRadius: "5px",
                              marginTop: "4px",
                              marginRight: "2px",
                              marginBottom: "4px",
                              marginLeft: "2px",
                            }}
                            id={
                              b.booked
                                ? "available-true-success"
                                : b.available
                                ? "available-true"
                                : ""
                            }
                            className={
                              b.booked
                                ? "btn btn-sm btn-outline-secondary-true mr-1 p-1"
                                : b.available
                                ? "btn btn-sm p-1 mr-1 btn-outline-secondary-false"
                                : "btn btn-sm py-0 px-1 btn-secondary m-1"
                            }
                            disabled={!b.available}
                          >
                            <span>{b.seatNo}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="col-11"></div>
                  </div>
                ))}
              </div>
              <br />
              <div className="row pb-2 ml-4 mr-4">
                <div className="col text-secondary text-left border-bottom">
                  GOLD - RS 250.00
                </div>
              </div>
              <div>
                <div className="col-12">
                  {gold.map((a, i) => (
                    <div className="row ml-4 mr-4 no-gutters" key={i}>
                      <div className="col-1 text-right mr-1">{a.rowName}</div>
                      <div className="col-3">
                        {a.seatList.slice(0, 7).map((b, i) => (
                          <div
                            key={i}
                            style={{
                              marginLeft: "2",
                              marginRight: "2",
                              marginTop: "4",
                              marginBottom: "4",
                              float: "left",
                              width: "21",
                              height: "21",
                            }}
                          >
                            <button
                              style={{
                                display: "inline-block",
                                fontSize: "10px",
                                textAlign: "center",
                                width: "21px",
                                height: "21px",
                                borderRadius: "5px",
                                marginTop: "4px",
                                marginRight: "2px",
                                marginBottom: "4px",
                                marginLeft: "2px",
                              }}
                              onClick={() =>
                                this.selectSeat(b.seatNo, a.rowName, "gold")
                              }
                              id={
                                b.booked
                                  ? "available-true-success"
                                  : b.available
                                  ? "available-true"
                                  : ""
                              }
                              className={
                                b.booked
                                  ? "btn btn-sm btn-outline-secondary-true mr-1 p-1"
                                  : b.available
                                  ? "btn btn-sm p-1 mr-1 btn-outline-secondary-false"
                                  : "btn btn-sm py-0 px-1 btn-secondary m-1"
                              }
                              disabled={!b.available}
                            >
                              {b.seatNo}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="col-4">
                        {a.seatList.slice(7, 18).map((b, i) => (
                          <div
                            key={i}
                            style={{
                              marginLeft: "2",
                              marginRight: "2",
                              marginTop: "4",
                              marginBottom: "4",
                              float: "left",
                              width: "21",
                              height: "21",
                            }}
                          >
                            <button
                              style={{
                                display: "inline-block",
                                fontSize: "10px",
                                textAlign: "center",
                                width: "21px",
                                height: "21px",
                                borderRadius: "5px",
                                marginTop: "4px",
                                marginRight: "2px",
                                marginBottom: "4px",
                                marginLeft: "2px",
                              }}
                              onClick={() =>
                                this.selectSeat(b.seatNo, a.rowName, "gold")
                              }
                              id={
                                b.booked
                                  ? "available-true-success"
                                  : b.available
                                  ? "available-true"
                                  : ""
                              }
                              className={
                                b.booked
                                  ? "btn btn-sm btn-outline-secondary-true mr-1 p-1"
                                  : b.available
                                  ? "btn btn-sm p-1 mr-1 btn-outline-secondary-false"
                                  : "btn btn-sm py-0 px-1 btn-secondary m-1"
                              }
                              disabled={!b.available}
                            >
                              {b.seatNo}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="col-3">
                        {a.seatList.slice(18).map((b, i) => (
                          <div
                            key={i}
                            style={{
                              marginLeft: "2",
                              marginRight: "2",
                              marginTop: "4",
                              marginBottom: "4",
                              float: "left",
                              width: "21",
                              height: "21",
                            }}
                          >
                            <button
                              style={{
                                display: "inline-block",
                                fontSize: "10px",
                                textAlign: "center",
                                width: "21px",
                                height: "21px",
                                borderRadius: "5px",
                                marginTop: "4px",
                                marginRight: "2px",
                                marginBottom: "4px",
                                marginLeft: "2px",
                              }}
                              onClick={() =>
                                this.selectSeat(b.seatNo, a.rowName, "gold")
                              }
                              id={
                                b.booked
                                  ? "available-true-success"
                                  : b.available
                                  ? "available-true"
                                  : ""
                              }
                              className={
                                b.booked
                                  ? "btn btn-sm btn-outline-secondary-true mr-1 p-1"
                                  : b.available
                                  ? "btn btn-sm p-1 mr-1 btn-outline-secondary-false"
                                  : "btn btn-sm py-0 px-1 btn-secondary m-1"
                              }
                              disabled={!b.available}
                            >
                              {b.seatNo}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {this.state.booked.length !== 0 && (
              <div className="fixed-bottom row">
                <div className="col-4"></div>
                <div className="col-lg-4 col-6 ml-3 mr-2 text-center">
                  <button
                    className="btn btn-primary  btn-block btn-md"
                    onClick={this.bookTickets}
                  >
                    Pay Rs. {this.state.booked.reduce((a, c) => a + c.price, 0)}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BuyTicket;
