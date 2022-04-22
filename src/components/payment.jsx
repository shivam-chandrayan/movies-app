import React, { Component } from "react";
import axios from "axios";
import BackBtn from "./backBtn";

class Payment extends Component {
  state = { data: { tickets: [] } };

  async componentDidMount() {
    let url = "https://us-central1-bkyow-22da6.cloudfunctions.net/app/details";
    let { data } = await axios.get(url);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container-fluid">
        <div className="row bg-dark">
          <BackBtn />
          <div className="col-11 p-3" style={{ color: "white" }}>
            <h4>{data.title}</h4>
            {data.movieHall}
          </div>
        </div>
        <div className="row bg-light">
          <div className="col-md-6 mb-4 p-2 col-lg-8 bg-light">
            <div className="m-2 p-2 bg-white">
              <img
                src="https://i.ibb.co/SK0HfNT/bookasmile-03.png"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-5 p-4 col-lg-4 bg-white">
            <h6 className="text-danger">BOOKING SUMMARY</h6>
            <table className="mx-2">
              <tbody>
                <tr>
                  <td>Movie Name</td>
                  <td className="text-right">{data.title}</td>
                </tr>
                <tr>
                  <td>Movie Hall</td>
                  <td className="text-right">{data.movieHall}</td>
                </tr>
                <tr>
                  <td>Total Tickets</td>
                  <td className="text-right">{data.tickets.length}</td>
                </tr>
                <tr>
                  <td>Tickets</td>
                  <td className="text-right">
                    {data.tickets.map((a, i) => (
                      <span className="mx-1" key={i}>
                        {a}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td></td>
                </tr>
                <tr className="pt-4 pb-4" style={{ background: "#fffcdc" }}>
                  <th className="mt-2 mb-2">Amount Paid</th>
                  <th className="text-right mt-2 mb-2">₹ {data.amount}</th>
                </tr>
              </tbody>
            </table>
            <img
              src="https://i.ibb.co/CVHYxVK/images-q-tbn-ANd9-Gc-Qq-PT1-GB7-Cpvo3-WDDCi-Wt-Vto-Q-SLqp-Z9-B1x-D3-D69-WTj-MPyl-Chnd.png"
              alt=""
              className="w-100 m-2"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
