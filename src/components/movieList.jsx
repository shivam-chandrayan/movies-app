import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navBar";
import MovieCard from "./movieCard";
import LeftPanel from "./leftPanel";
import Carousel from "./carousel";
import queryString from "query-string";

class MovieList extends Component {
  state = {
    data: [],
    cities: ["NCR", "Ahemdabad", "Chennai", "Mumbai", "Hyderabad"],
    lang: [],
    format: [],
    genre: [],
  };
  async componentDidMount() {
    let url = "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/";
    let city = this.props.match.params.city;
    let params = this.props.location.search;
    url = url + city + params;
    const { data } = await axios.get(url);
    this.setState({ data });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      let url =
        "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/";
      let city = this.props.match.params.city;
      let q = this.props.location.search;
      url = url + city + q;
      const { data } = await axios.get(url);
      this.setState({ data });
    }
  }

  handleCheckbox = (params) => {
    let city = this.props.match.params.city;
    this.props.history.push("/home/" + city + params);
  };

  handleSearch = (q) => {
    let city = this.props.match.params.city;
    this.props.history.push("/home/" + city + "?q=" + q);
  };

  render() {
    const city = this.state.cities.find(
      (a) => a === this.props.match.params.city
    );
    let { q } = queryString.parse(this.props.location.search);
    q = q ? q : "";
    return (
      <React.Fragment>
        <NavBar onSearch={this.handleSearch} />
        {/* Secondary NavBar */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 mt-4">
              <Carousel />
            </div>
            <div className="col-2"></div>
          </div>

          <nav className="navbar navbar-expand-sm navbar-light bg-light d-none d-lg-block">
            <a href="#" className="navbar-brand">
              Movies
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Now Showing
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Coming Soon
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Exclusive
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* main body */}
          <div className="row bg-light">
            {/* left panel */}
            <div className="col-lg-3 d-none d-lg-block">
              <LeftPanel onCheckBoxChange={this.handleCheckbox} query={q} />
            </div>
            {/* right panel */}
            <div className="col-lg-9 col-12">
              <div className="row px-4 mx-4 px-lg-2 mx-lg-2">
                {this.state.data.map((a, i) => (
                  <MovieCard details={a} key={i} city={city} id={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieList;
