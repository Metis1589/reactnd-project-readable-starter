import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActions from '../store/posts/actions';

class PostsList extends Component {

    handleClick(post_id, e) {
        e.preventDefault();
        const props = this.props;
        if (post_id) {
            ClientAPI.deletePost(post_id)
                .then(() => {
                    props.deletePost(post_id);
                });
        }
    }

    handleVote(post_id, voteOption, e) {
        e.preventDefault();
        const props = this.props;
        if (post_id) {
            ClientAPI.votePost(post_id, voteOption)
                .then((post) => {
                    props.votePost(post);
                });
        }
    }

    render() {
        const posts = this.props.posts;
        return (
            <div className="jumbotron">
                <p>Posts list</p>
                <ol className="books-grid">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                            <br />
                            <p>{post.body}</p>
                            <p>{post.author}</p>
                            <p>{post.timestamp}</p>
                            <p>{post.voteScore} <button onClick={this.handleVote.bind(this, post.id, 'upVote')}>UpVote</button>&nbsp;
                                <button onClick={this.handleVote.bind(this, post.id, 'downVote')}>DownVote</button></p>
                            <p>Comments: {post.commentCount}</p>
                            <p>
                                <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link> &nbsp;
                                <a href="#" onClick={this.handleClick.bind(this, post.id)}>Delete</a>
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: ownProps.posts
    }
}

function mapDispatchToProps (dispatch) {
    return {
        votePost: (data) => dispatch(postsActions.votePost(data)),
        deletePost: (data) => dispatch(postsActions.deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
