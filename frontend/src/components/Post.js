import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ClientAPI from '../utils/APIClient';
import * as postsActions from '../store/posts/actions';
import * as commentsActions from '../store/comments/actions';
import timeConvertor from '../utils/timeConvertor';

class Post extends Component {

    static propTypes = {
        post: PropTypes.array.isRequired,
        detailView: PropTypes.bool.isRequired
    }

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

    handleCommentDeleteClick(comment_id, e) {
        e.preventDefault();
        let props = this.props;
        let post = props.post;
        post.commentCount--;
        if (comment_id) {
            ClientAPI.deleteComment(comment_id)
                .then((comment) => {
                    props.deleteComment(comment);
                    props.updatePost(post);
                })
                .catch((err) => {
                    console.error("error: " + err);
                    post.commentCount++;
                })
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

    handleCommentVote(comment_id, voteOption, e) {
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
        const post = this.props.post;
        const detailView = this.props.detailView;
        const comments = typeof(this.props.comments) !== 'undefined' ? this.props.comments : [];
        return (
            <div className="box box-widget">
                <div className="box-header with-border">
                    <div className="user-block">
                        <img className="img-circle" src="/user_avatar.png" alt="User Image"/>
                        <span className="username">{post.author}</span>
                        <span className="description">Shared publicly - {timeConvertor(post.timestamp)}</span>
                    </div>
                    <div className="box-tools">
                        <Link className="btn btn-box-tool" to={`/${post.category}/${post.id}/edit`}>
                            <i className="fa fa-edit"/>
                        </Link>
                        <button type="button" className="btn btn-box-tool"
                                onClick={this.handleClick.bind(this, post.id)}>
                            <i className="fa fa-remove"/>
                        </button>
                    </div>
                </div>
                <div className="box-body">
                    <span className="username">
                        {detailView && (<b>{post.title}</b>)}
                        {!detailView && (<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>)}
                    </span>
                    <p>{post.body}</p>
                    {detailView && (<Link style={{ marginRight: '6px'}} className="btn btn-primary btn-xs" to={`/post/${post.id}/add-comment`}>
                        <i className="fa fa-comment"/> Add comment to post
                    </Link> )}
                    <button type="button" className="btn btn-default btn-xs"
                            onClick={this.handleVote.bind(this, post.id, 'upVote')}>
                        <i className="fa fa-thumbs-o-up"/> UpVote
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-default btn-xs"
                            onClick={this.handleVote.bind(this, post.id, 'downVote')}>
                        <i className="fa fa-thumbs-o-down"/> DownVote
                    </button>
                    <span className="pull-right text-muted">{post.voteScore} vote score - {post.commentCount} comments</span>
                </div>
                {detailView && comments.length>0 && comments.map((comment) => (
                    <div className="box-footer box-comments" key={comment.id}>
                        <div>
                            <img className="img-circle img-sm" src="/user_avatar.png" alt="User Image"/>
                            <div className="comment-text">
                                <span className="username">{comment.author}&nbsp;
                                     <span style={{fontWeight: 'normal'}}>
                                          left comment - {timeConvertor(comment.timestamp)}
                                     </span>
                                     <span className="text-muted pull-right">
                                         <div style={{textAlign: 'right'}}>
                                             <Link className="btn btn-box-tool" to={`/${post.category}/${post.id}/${comment.id}/edit`}>
                                                 <i className="fa fa-edit"/>
                                             </Link>
                                             <button type="button" className="btn btn-box-tool"
                                                     onClick={this.handleCommentDeleteClick.bind(this, comment.id)}>
                                                 <i className="fa fa-remove"/>
                                             </button>
                                         </div>
                                     </span>
                                </span>
                                {comment.body}
                            </div>
                            <div className="box-body">
                                <button type="button" className="btn btn-default btn-xs"
                                        onClick={this.handleCommentVote.bind(this, comment.id, 'upVote')}>
                                    <i className="fa fa-thumbs-o-up"/> UpVote
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-default btn-xs"
                                        onClick={this.handleCommentVote.bind(this, comment.id, 'downVote')}>
                                    <i className="fa fa-thumbs-o-down"/> DownVote
                                </button>
                                <span className="pull-right text-muted">{comment.voteScore} vote score</span>
                            </div>
                        </div>
                    </div>
                ))}
                {detailView && comments.length==0 && (
                    <div className="box-footer box-comments">
                        <div className="box-header with-border">
                            <i>No comments were published to this post. You can add <Link to={`/post/${post.id}/add-comment`}>new one</Link>.</i>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        detailView: ownProps.detailView,
        post: ownProps.post,
        comments: ownProps.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (data) => dispatch(postsActions.votePost(data)),
        updatePost: (data) => dispatch(postsActions.updatePost(data)),
        deletePost: (data) => dispatch(postsActions.deletePost(data)),
        voteComment: (data) => dispatch(commentsActions.voteComment(data)),
        deleteComment: (data) => dispatch(commentsActions.deleteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
