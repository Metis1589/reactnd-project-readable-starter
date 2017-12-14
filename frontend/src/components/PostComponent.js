import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as commentsActionTypes from '../store/comments/actionTypes';
import { Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import Post from './Post';

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
        const history = this.props.history;
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
            <div className="col-xs-12">
                <section className="content-header">
                    <h1>
                        {post.title}
                        <small>Posts details</small>
                    </h1>
                </section>
                <br />
                {post && (
                    <Post post={post} history={history} comments={comments}/>
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
