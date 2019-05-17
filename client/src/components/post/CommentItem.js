import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  handleDelete(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { postId, comment, auth, post } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-sm-2">
            <p className="text-center">{comment.user.name}</p>
          </div>
          <div className="col-sm-8">
            <p className="lead">{comment.text}</p>
          </div>
          <div className="col-sm-2">
            {auth.user.id === comment.user._id ||
            post.post.user === auth.user.id ? (
              <button
                onClick={this.handleDelete.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-sm btn-danger mr-1"
              >
                <i className="fa fa-times" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
