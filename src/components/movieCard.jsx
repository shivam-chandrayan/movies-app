import React from "react";

const MovieCard = (props) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 m-lg-1 bg-white px-4 py-2">
      <a href={`/bookMovie/${props.city}/${props.id}`}>
        <img
          className="w-100"
          src={props.details.img}
          alt=""
          style={{ borderRadius: "15px" }}
        />
      </a>
      <table className="w-100">
        <tbody>
          <tr>
            <td>
              <i className="fas fa-heart text-danger mx-1"></i>
              {props.details.rating}
            </td>
            <td>{props.details.title}</td>
          </tr>
          <tr className="d-none d-lg-block">
            <td>{props.details.votes}</td>
            <td>{props.details.desc}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieCard;
