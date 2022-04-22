import React from "react";
import { useHistory } from "react-router-dom";

const BackBtn = () => {
  let history = useHistory();
  return (
    <div
      className="col-1 text-center text-light pt-4"
      onClick={() => history.goBack()}
    >
      <i className="fas fa-chevron-left fa-2x my-2"></i>
    </div>
  );
};

export default BackBtn;
