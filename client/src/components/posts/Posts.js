import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";

// Actions
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { loading, posts } = this.props.post;
    let postContent;

    if (posts == null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div className="posts">{postContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
