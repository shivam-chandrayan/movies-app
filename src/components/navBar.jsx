import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo.svg";

class NavBar extends Component {
  handleChange = (e) => {
    this.setState({ val: e.currentTarget.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.val);
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <Logo />
            <img src="logo.svg" alt="" width="100px" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample03">
            <form
              className="form-inline my-2 my-md-0 w-100 pr-4"
              onSubmit={this.handleSubmit}
            >
              <input
                className="form-control input-sm mr-4"
                type="text"
                placeholder="&#xF002; Search for Movies"
                onChange={this.handleChange}
                style={{ width: "60%", marginLeft: "80px" }}
              />
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="dropdown03"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  NCR
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown03">
                  <a href="/home/NCR" className="dropdown-item">
                    NCR
                  </a>
                  <a className="dropdown-item" href="/home/Ahmedabad">
                    Ahmedabad
                  </a>
                  <a href="/home/Chennai" className="dropdown-item">
                    Chennai
                  </a>
                  <a className="dropdown-item" href="/home/Mumbai">
                    Mumbai
                  </a>
                  <a className="dropdown-item" href="/home/Hyderabad">
                    Hyderabad
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link mx-4 text-white"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  English
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link mx-4 text-white"
                  href="/whatsApp"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-light btn-sm mx-4">
              SignIn
            </button>
          </div>
        </nav>
        <nav className="nav nav-fill bg-dark">
          <a
            href="#"
            className="nav-item nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Movies
          </a>
          <a
            href="#"
            className="nav-item nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Event
          </a>
          <a
            href="#"
            className="nav-item nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Plays
          </a>
          <a
            href="#"
            className="nav-item nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Activities
          </a>
          <a
            href="#"
            className="nav-item nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Fanhood
          </a>
        </nav>
      </div>
    );
  }
}

export default NavBar;
