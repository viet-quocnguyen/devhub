import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
// Actions
import { createProfile } from "../../actions/profileActions";
class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      company: "",
      status: "",
      skills: "",
      bio: "",
      github: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length > 0) {
      this.setState({
        ...this.state,
        errors: nextProps.errors
      });
    }
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const profile = {
      handle: this.state.handle,
      company: this.state.company,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      github: this.state.github
    };
    this.props.createProfile(profile, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Enter your information:</p>
              <small className="d-block pb-3 text-danger">
                * = required fields
              </small>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  type="text"
                  placeholder="Enter your handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  info="* A unique handle for your profile URL. (This CAN'T be changed later)"
                  error={errors.handle}
                />
                <TextField
                  type="text"
                  placeholder="Enter your company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  info="The company that you are currently working for"
                />
                <TextField
                  type="text"
                  placeholder="Enter your status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  info="* Your current status (eg. 'Student', 'Junior Developer', 'Senior Developer', 'Project Manager', etc)"
                  error={errors.status}
                />
                <TextField
                  type="text"
                  placeholder="Enter your skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  info="Enter your skills by comma seperated format (eg. C++,JavaScript,PHP,HTML,CSS)"
                />
                <TextArea
                  placeholder="Enter your bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  info="* Write something about yourself"
                  error={errors.bio}
                />
                <TextField
                  type="text"
                  placeholder="Enter your github url"
                  name="github"
                  value={this.state.github}
                  onChange={this.handleChange}
                  info="Include your github url to show others your projects"
                />
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
