import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import CommentItem from "./CommentItem";
import Spinner from "../common/Spinner";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    if (comments) {
      return comments.map(comment => (
        <CommentItem key={comment._id} postId={postId} comment={comment} />
      ));
    } else {
      return <Spinner />;
    }
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string
};

export default CommentFeed;
