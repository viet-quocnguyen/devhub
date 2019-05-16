import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import TextArea from "../common/TextArea";
// Actions
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const postData = {
      text: this.state.text
    };
    this.props.addPost(postData);
    this.setState({
      text: ""
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextArea
                placeholder="Create Post"
                name="text"
                value={this.state.text}
                onChange={this.handleChange.bind(this)}
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
