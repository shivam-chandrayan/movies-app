import React, { Component } from "react";

class LeftPanel extends Component {
  state = {
    selectLang: true,
    selectFormat: false,
    selectGenre: false,
    lang: [],
    format: [],
    genre: [],
  };

  handleChange = (e) => {
    let { lang, format, genre } = this.state;

    if (e.currentTarget.name === "lang") {
      let index = lang.findIndex((a) => a === e.currentTarget.id);
      if (index > -1) lang.splice(index, 1);
      else {
        lang.push(e.currentTarget.id);
      }
    }

    if (e.currentTarget.name === "format") {
      let index = format.findIndex((a) => a === e.currentTarget.id);
      if (index > -1) format.splice(index, 1);
      else {
        format.push(e.currentTarget.id);
      }
    }

    if (e.currentTarget.name === "genre") {
      let index = genre.findIndex((a) => a === e.currentTarget.id);
      if (index > -1) genre.splice(index, 1);
      else {
        genre.push(e.currentTarget.id);
      }
    }

    this.setState({ lang, format, genre });

    let params = "";
    this.props.query ? (params = "?q=" + this.props.query) : (params = "");
    if (lang.length) {
      !params ? (params += "?") : (params += "&");
      params += "lang=" + lang.join(",");
    }
    if (format.length) {
      !params ? (params += "?") : (params += "&");
      params += "format=" + format.join(",");
    }
    if (genre.length) {
      !params ? (params += "?") : (params += "&");
      params += "genre=" + genre.join(",");
    }
    this.props.onCheckBoxChange(params);
  };

  render() {
    return (
      <div className="bg-light">
        <div className="p-3 mx-4 " style={{ background: "white" }}>
          <img
            src="https://i.ibb.co/Hry1kDH/17443322900502723126.jpg"
            alt=""
            className="w-100"
          />
        </div>

        <div className="my-4 mx-4 px-4 py-2" style={{ background: "white" }}>
          <div
            onClick={() =>
              this.state.selectLang
                ? this.setState({ selectLang: false })
                : this.setState({ selectLang: true })
            }
          >
            <i
              className={
                this.state.selectLang === true
                  ? "fa fa-chevron-up text-info mr-3"
                  : "fa fa-chevron-down text-info mr-3"
              }
            ></i>
            <span className="text-info">Select Language</span>
          </div>{" "}
          {this.state.selectLang && (
            <div className="form-group mt-2">
              <div className="form-check">
                <input
                  name="lang"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Hindi"
                />
                <label className="form-check-label" htmlFor="hindi">
                  Hindi
                </label>
              </div>
              <div className="form-check">
                <input
                  name="lang"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="English"
                />
                <label className="form-check-label" htmlFor="english">
                  English
                </label>
              </div>
              <div className="form-check">
                <input
                  name="lang"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Punjabi"
                />
                <label className="form-check-label" htmlFor="punjabi">
                  Punjabi
                </label>
              </div>
              <div className="form-check">
                <input
                  name="lang"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Tamil"
                />
                <label className="form-check-label" htmlFor="tamil">
                  Tamil
                </label>
              </div>
            </div>
          )}
        </div>

        {!this.state.selectFormat ? (
          <div className="my-4 mx-4 px-4 py-2" style={{ background: "white" }}>
            <div onClick={() => this.setState({ selectFormat: true })}>
              <i className="fa fa-chevron-down mr-3"></i>
              <span className="">Format</span>
            </div>
          </div>
        ) : (
          <div className="my-4 mx-4 px-4 py-2" style={{ background: "white" }}>
            <div onClick={() => this.setState({ selectFormat: false })}>
              <i className="fa fa-chevron-up text-info mr-3"></i>
              <span className="text-info">Format</span>
            </div>
            <br />
            <div className="form-group">
              <div className="form-check">
                <input
                  name="format"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="2D"
                />
                <label className="form-check-label" htmlFor="2D">
                  2D
                </label>
              </div>
              <div className="form-check">
                <input
                  name="format"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="3D"
                />
                <label className="form-check-label" htmlFor="3D">
                  3D
                </label>
              </div>
              <div className="form-check">
                <input
                  name="format"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="4DX"
                />
                <label className="form-check-label" htmlFor="4DX">
                  4DX
                </label>
              </div>
            </div>
          </div>
        )}

        {!this.state.selectGenre ? (
          <div className="my-4 mx-4 px-4 py-2" style={{ background: "white" }}>
            <div onClick={() => this.setState({ selectGenre: true })}>
              <i className="fa fa-chevron-down mr-3"></i>
              <span className="">Genre</span>
            </div>
          </div>
        ) : (
          <div className="my-4 mx-4 px-4 py-2" style={{ background: "white" }}>
            <div onClick={() => this.setState({ selectGenre: false })}>
              <i className="fa fa-chevron-up text-info mr-3"></i>
              <span className="text-info">Genre</span>
            </div>
            <br />
            <div className="form-group">
              <div className="form-check">
                <input
                  name="genre"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Action"
                />
                <label className="form-check-label" htmlFor="action">
                  Action
                </label>
              </div>
              <div className="form-check">
                <input
                  name="genre"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Adventure"
                />
                <label className="form-check-label" htmlFor="adventure">
                  Adventure
                </label>
              </div>
              <div className="form-check">
                <input
                  name="genre"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Biography"
                />
                <label className="form-check-label" htmlFor="biography">
                  Biography
                </label>
              </div>
              <div className="form-check">
                <input
                  name="genre"
                  onChange={this.handleChange}
                  type="checkbox"
                  className="form-check-input"
                  id="Comedy"
                />
                <label className="form-check-label" htmlFor="Comedy">
                  Comedy
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LeftPanel;
