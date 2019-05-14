import jwt_decode from "jwt-decode";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import "./App.css";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  const user = jwt_decode(token);
  setAuthToken(token);
  store.dispatch(setCurrentUser(user));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    alert("Your session has ended!");
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
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
            <Route
              exact
              path="/"
              render={() =>
                store.getState().auth.isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Landing />
                )
              }
            />
            {/* <Route exact path="/" component={Landing} /> */}
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/create-profile" component={CreateProfile} />
              <Route exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
            </div>
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
