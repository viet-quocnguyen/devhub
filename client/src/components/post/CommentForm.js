import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import TextArea from "../common/TextArea";
// Actions
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
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
    const { postId } = this.props;
    e.preventDefault();

    const commentData = {
      text: this.state.text
    };
    this.props.addComment(postId, commentData);
    this.setState({
      text: ""
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextArea
                placeholder="Create Comment"
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

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
