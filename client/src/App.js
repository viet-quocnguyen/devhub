import jwt_decode from "jwt-decode";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";

import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  const user = jwt_decode(token);
  setAuthToken(token);
  store.dispatch(setCurrentUser(user));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    store.dispatch(logoutUser);
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
