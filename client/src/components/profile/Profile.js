import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { getProfileByHandle } from "../../actions/profileActions";

// Components
import Spinner from "../common/Spinner";
import ProfileGithub from "./ProfileGithub";
class Profile extends Component {
  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link to="/" className="btn btn-light mb-3 float-left">
                    Back To Dashboard
                  </Link>
                </div>
                <div className="col-6" />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-info text-white mb-3">
                    <div className="text-center">
                      <h1 className="display-4 text-center">
                        {profile.user.name}
                      </h1>
                      <p className="lead text-center">
                        {profile.status} at {profile.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">
                      {profile.user.name}'s Bio
                    </h3>
                    <p className="lead">{profile.bio}</p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {profile.skills.map((skill, index) => (
                          <div key={index} className="p-3">
                            <i className="fa fa-check" /> {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {profile.github ? (
                <ProfileGithub username={profile.github} />
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">{profileContent}</div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
