import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

// Components
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  handleDelete() {
    this.props.deleteAccount(this.props.history);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardCotent;
    if (profile === null || loading) {
      dashboardCotent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardCotent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "30px" }} />
            <button
              onClick={this.handleDelete.bind(this)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardCotent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not created your profile. Please add some information
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-primary">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardCotent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
