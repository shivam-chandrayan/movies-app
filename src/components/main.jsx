import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import MovieList from "./movieList";
import BookMovie from "./bookMovie";
import BuyTicket from "./buyTicket";
import Payment from "./payment";
import WhatsAppMain from "./whatsappMain";

const Main = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/payment" component={Payment} />
        <Route
          path="/bookMovie/:city/:id/buyTicket/:day/:place/:timing"
          component={BuyTicket}
        />
        <Route exact path="/bookMovie/:city/:id" component={BookMovie} />
        <Route exact path="/home/:city" component={MovieList} />
        <Route exact path="/home">
          <Redirect to="/home/NCR" />
        </Route>
        <Route exact path="/">
          <Redirect to="/home/NCR" />
        </Route>
        <Route exact path="/whatsApp" component={WhatsAppMain} />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Main;
