import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as commentsActionTypes from '../store/comments/actionTypes';
import { Link } from 'react-router-dom';
import CommentsList from './CommentsList'

class PostComponent extends Component {

    componentDidMount() {
        let props = this.props;
        const post_id = props.match.params.post_id;
        if(post_id && post_id!='new' && !props.comments[post_id]){
            ClientAPI.getCommentsList(post_id)
                .then((comments) => {
                    props.dispatch({type: commentsActionTypes.FETCH_COMMENTS, post_id: post_id, payload: comments});
                });
        }
    }

    render() {
        const post_id = this.props.match.params.post_id;
        let post = this.props.posts.list.filter(function (post) {
            if (post.id==post_id) { return post }
        });
        if(post.length > 0){
            post = post[0]
        }
        else{
            this.props.history.push('/');
        }
        const comments = this.props.comments[post_id] ? this.props.comments[post_id] : [];
        return (
            <div className="row">
                {post && (
                    <div>
                        <h3>Post details</h3>
                        <div>
                            <label>Title: {post.title} </label>
                        </div>
                        <div>
                            <label>Body: {post.body} </label>
                        </div>
                        <div>
                            <label>Author: {post.author} </label>
                        </div>
                        <div>
                            <label>Post date: {post.timestamp} </label>
                        </div>
                        <div>
                            <label>VoteScore: {post.voteScore} </label>
                        </div>
                        <div>
                            <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link> &nbsp;
                            <a>Delete</a>
                        </div>
                        <div>
                            <h1>Comments</h1>
                            <div>
                                <CommentsList comments={comments} post={post}/>
                                <br />
                                <Link to={`/post/${post.id}/add-comment`}>Add comment</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
        comments: state.comments
    }
}

export default connect(mapStateToProps)(PostComponent);
