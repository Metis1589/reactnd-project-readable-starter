import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as commentsActionTypes from '../store/comments/actionTypes';
import * as commentsActions from '../store/comments/actions';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
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
        if (comment.id) {
            ClientAPI.updateComment(comment.id, comment)
                .then(() => {
                    props.updateComment(comment);
                    props.history.push('/');
                });
        } else {
            comment.timestamp = Date.now();
            comment.id = uuid();
            ClientAPI.createComment(comment)
                .then((comment) => {
                    props.createComment(comment);
                    props.history.push('/');
                });
        }
    }

    handleChange(field, e) {
        const comment = Object.assign({}, this.state.comment, {[field]: e.target.value});
        this.setState(Object.assign({}, this.state, {comment}));
    }

    /*
    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.post, this.state.post)) {
            this.setState({...this.state, post: nextProps.post});
        }
    }
    */

    componentDidMount() {
        const comment_id = this.props.match.params.comment_id;
        const post_id = this.props.match.params.post_id;
        if(this.props.comments[post_id]){
            let comment = this.props.comments[post_id].filter(function (comment) {
                if (comment.id==comment_id) { return comment }
            });
            if(comment.length > 0){
                comment = comment[0]
            }
            this.setState({comment: comment});
            /*
            else{
                this.props.history.push('/');
            }
            */
        }
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
        comments: state.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createComment: (data) => dispatch(commentsActions.createComment(data)),
        updateComment: (data) => dispatch(commentsActions.updateComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditComponent);
