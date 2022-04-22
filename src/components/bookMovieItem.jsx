import React from "react";
import { ReactComponent as MTicket } from "./mTicket.svg";
import { ReactComponent as Food } from "./food.svg";

const BookMovieItem = (props) => {
  const show = props.showTimingDetails;
  return (
    <div className="row">
      <div
        className={
          props.like.findIndex((a) => a === props.place) > -1
            ? "col-1 text-danger"
            : "col-1"
        }
        onClick={() => props.onLike(props.place)}
      >
        <i className="far fa-heart"></i>
      </div>
      <div className="col-11 col-lg-4">
        <strong>{show.name}</strong>
        <span>
          <br />
          <MTicket width="30" />
          <span style={{ fontSize: "12px", verticalAlign: "bottom" }}>
            M-Ticket
          </span>
          <Food width="30" />
          <span style={{ fontSize: "12px", verticalAlign: "bottom" }}>F&B</span>
        </span>
      </div>
      <div className="col-12 col-lg-7">
        {show.timings.map((a, i) => (
          <button
            className="btn btn-outline-secondary btn-sm m-2"
            data-toggle="tooltip"
            data-placement="bottom"
            title={a.price}
            key={i}
            onClick={() => props.buyTicket(props.place, i)}
          >
            {a.name}
          </button>
        ))}
        <br />
        <span className="text-danger ml-4 pl-4 mr-2">•</span>
        <span style={{ fontSize: "12px" }}>Cancellation Available</span>
      </div>
    </div>
  );
};

export default BookMovieItem;
