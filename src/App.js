import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import OrderPizza from "./components/OrderPizza";
import Success from "./components/Success";

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/Success" component={Success}></Route>
          <Route path="/pizza" component={OrderPizza}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
