import React, { Component } from "react";
import NavBar from "./navBar";
import axios from "axios";

class WhatsAppMain extends Component {
  state = {
    numbers: ["Enter a number"],
    dump: "",
    link: "",
  };

  async componentDidMount() {
    let url =
      "https://sheets.googleapis.com/v4/spreadsheets/1defoyUzjZHuP_Qm1C9vaiF4SifoWF8cQge4Qg7eIPJE/values/Sheet1!A:A";

    let { data } = await axios.get(url);
    console.log(data);
  }

  handleChange = (e) => {
    this.setState({ dump: e.currentTarget.value });
  };
  handleClick = () => {
    let numbers = this.state.dump.split(" ");
    this.setState({ numbers });
  };
  handleLeftClick = (index) => {
    let link = "https://wa.me/91";
    const { numbers } = this.state;
    link = link + numbers[index];
    this.setState({ link });
  };
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <textarea
                name="numbers"
                id="numbers"
                rows="5"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
              <button
                className="btn btn-primary my-2"
                onClick={this.handleClick}
              >
                Submit
              </button>
              <br />
              <a href={this.state.link} target="_blank">
                {this.state.link}
              </a>
            </div>
            <div className="col-12 col-md-4">
              <ul className="list-group">
                {this.state.numbers.map((a, i) => (
                  <li
                    className="list-group-item"
                    key={i}
                    onClick={() => this.handleLeftClick(i)}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatsAppMain;
