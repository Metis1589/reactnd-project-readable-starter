import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as commentsActions from '../store/comments/actions';

class CommentsList extends Component {

    handleClick(comment_id, e) {
        e.preventDefault();
        const props = this.props;
        if (comment_id) {
            ClientAPI.deleteComment(comment_id)
                .then((comment) => {
                    props.deleteComment(comment);
                });
        }
    }
    handleVote(comment_id, voteOption, e) {
        e.preventDefault();
        const props = this.props;
        if (comment_id) {
            ClientAPI.voteComment(comment_id, voteOption)
                .then((comment) => {
                    props.voteComment(comment);
                });
        }
    }

    render() {
        const comments = this.props.comments;
        const post = this.props.post;
        return (
            <div className="jumbotron">
                <p>Comments list</p>
                <ol className="books-grid">
                    {comments.map((comment) => (
                        <li key={comment.id}>

                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{comment.timestamp}</p>
                            <p>{comment.voteScore}</p>

                            <p>{comment.voteScore} <button onClick={this.handleVote.bind(this, comment.id, 'upVote')}>UpVote</button>&nbsp;
                                <button onClick={this.handleVote.bind(this, comment.id, 'downVote')}>DownVote</button></p>

                            <p>
                                <Link to={`/${post.category}/${post.id}/${post.id}/edit`}>Edit</Link> &nbsp;
                                <a href="#" onClick={this.handleClick.bind(this, comment.id)}>Delete</a>
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
        post: ownProps.post,
        comments: ownProps.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        voteComment: (data) => dispatch(commentsActions.voteComment(data)),
        deleteComment: (data) => dispatch(commentsActions.deleteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
