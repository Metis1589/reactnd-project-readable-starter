import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActionTypes from '../store/posts/actionTypes';
import { Link } from 'react-router-dom';

class PostComponent extends Component {

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
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(PostComponent);
