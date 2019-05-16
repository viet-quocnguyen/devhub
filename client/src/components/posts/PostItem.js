import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { deletePost, likeAndUnlikePost } from "../../actions/postActions";

class PostItem extends Component {
  handleDelete(postId) {
    this.props.deletePost(postId);
  }
  handleDate(date) {
    let formatDate = new Date(date);
    return formatDate.toDateString();
  }
  handleLike(postId) {
    this.props.likeAndUnlikePost(postId);
  }
  isLiked(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user._id === auth.user.id).length > 0) {
      return true;
    }
    return false;
  }
  render() {
    const { post, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2" style={{ marginBottom: "10px" }}>
            <div className="text-center">{post.name}</div>
            <div className="text-center text-muted small">
              <small>{this.handleDate(post.date)}</small>
            </div>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              type="button"
              onClick={this.handleLike.bind(this, post._id)}
              className="btn btn-light mr-1"
            >
              <i
                className={`${
                  this.isLiked(post.likes) ? "text-info" : ""
                } fa fa-thumbs-up`}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>

            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                onClick={this.handleDelete.bind(this, post._id)}
                type="button"
                className="btn btn-danger mr-1"
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

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likeAndUnlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likeAndUnlikePost }
)(PostItem);
