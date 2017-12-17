import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActions from '../store/posts/actions';
import * as commentsActions from '../store/comments/actions';
import * as commentsActionTypes from '../store/comments/actionTypes';
import uuid from 'uuid';

class CommentEditComponent extends Component {

    state = {
        comment: {
            "id": "",
            "parentId" : "",
            "timestamp": "",
            "body": "",
            "author": "",
            "voteScore": 0,
            "deleted": false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const props = this.props;
        const { comment } = this.state;
        comment.parentId = this.props.match.params.post_id;
        let post = this.props.posts.list.filter(function (post) {
            if (post.id==comment.parentId) { return post }
        });
        if(post.length > 0){
            post = post[0]
        }
        if (comment.id) {
            ClientAPI.updateComment(comment.id, comment)
                .then(() => {
                    props.updateComment(comment);
                    post.commentCount++;
                    props.updatePost(post);
                    props.history.goBack();
                });
        } else {
            comment.timestamp = Date.now();
            comment.id = uuid();
            ClientAPI.createComment(comment)
                .then((comment) => {
                    props.createComment(comment);
                    post.commentCount++;
                    props.updatePost(post);
                    props.history.goBack();
                });
        }
    }

    handleChange(field, e) {
        const comment = Object.assign({}, this.state.comment, {[field]: e.target.value});
        this.setState(Object.assign({}, this.state, {comment}));
    }

    componentDidMount() {
        const comment_id = this.props.match.params.comment;
        const post_id = this.props.match.params.post_id;
        const props = this.props;
        if(typeof(this.props.comments[post_id])==='undefined'){
            ClientAPI.getCommentsList(post_id)
                .then((comments) => {
                    props.fetchComments(comments, post_id);
                    this.getParticularCommentFromList(comments, post_id, comment_id)
                });
        }
        else{
            this.getParticularCommentFromList(props.comments[post_id], post_id, comment_id)
        }
    }

    getParticularCommentFromList(comments, post_id, comment_id){
        let comment = comments.filter(function (comment) {
            if (comment.id==comment_id) { return comment }
        });
        if(comment.length > 0){
            comment = comment[0]
        }
        this.setState({comment: comment});
    }

    render() {
        const { comment } = this.state;
        return (
            <div className="col-xs-12">
                <section className="content-header">
                    <h1>
                        Comment {comment.id ? 'edit' : 'add' }
                    </h1>
                </section>
                <br />
                {comment && (
                    <div>
                        <div>
                            <form onSubmit={this.handleSubmit.bind(this)} noValidate>

                                <div className="form-group">
                                    <label className="label-control">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={comment.author}
                                        onChange={this.handleChange.bind(this, 'author')}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label-control">Body</label>
                                      <textarea
                                          className="form-control"
                                          value={comment.body}
                                          onChange={this.handleChange.bind(this, 'body')}
                                      />
                                </div>

                                <button type="submit" className="btn btn-default">
                                    {comment.id ? 'Update' : 'Create' } comment
                                </button>

                            </form>
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

function mapDispatchToProps (dispatch) {
    return {
        fetchComments: (data) => dispatch(commentsActions.fetchComments(data)),
        createComment: (data) => dispatch(commentsActions.createComment(data)),
        updateComment: (data) => dispatch(commentsActions.updateComment(data)),
        updatePost: (data) => dispatch(postsActions.updatePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditComponent);
