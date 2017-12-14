import React, { Component } from 'react';
import timeConvertor from '../utils/timeConvertor';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActions from '../store/posts/actions';
import sortBy from 'sort-by';

class PostsList extends Component {

    state = {
        orderBy: 'timestamp'
    }

    handleEditClick(link, e) {
        e.preventDefault();
        this.props.history.push(link);
    }

    handleOrderByClick(orderByField, e) {
        e.preventDefault();
        this.setState({orderBy:orderByField});
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
        posts.sort(sortBy('-' + this.state.orderBy));
        return (
            <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                <section class="content-header">
                    <h1>
                        Posts list
                        <small>Preview page</small>
                    </h1>
                </section>
                <div>
                    <h5>Order by:</h5>
                    <a href="" onClick={this.handleOrderByClick.bind(this, 'timestamp')}>datetime</a> &nbsp;
                    <a href="" onClick={this.handleOrderByClick.bind(this, 'voteScore')}>popularity</a>
                </div>
                {posts.map((post) => (
                    <div className="box box-widget" key={post.id}>
                        <div className="box-header with-border">
                            <div className="user-block">
                                <img className="img-circle" src="https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg" alt="User Image"/>
                                <span className="username">{post.author}</span>
                                <span className="description">Shared publicly - {timeConvertor(post.timestamp)}</span>
                            </div>
                            <div className="box-tools">
                                <button type="button" className="btn btn-box-tool" onClick={this.handleEditClick.bind(this, '/'+category.path)}>
                                    <i className="fa fa-minus"/>
                                </button>
                                <button type="button" className="btn btn-box-tool" data-widget="remove">
                                    <i className="fa fa-times"/>
                                </button>
                            </div>
                        </div>
                        <div className="box-body">
                            <span className="username"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></span>
                            <p>{post.body}</p>
                            <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"/> UpVote</button>&nbsp;
                            <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-down"/> DownVote</button>
                            <span className="pull-right text-muted">{post.voteScore} vote score - {post.commentCount} comments</span>
                        </div>

                        <li style={{display:'none'}}>
                            <p>{post.voteScore} <button onClick={this.handleVote.bind(this, post.id, 'upVote')}>UpVote</button>&nbsp;
                                <button onClick={this.handleVote.bind(this, post.id, 'downVote')}>DownVote</button></p>
                            <p>Comments: {post.commentCount}</p>
                            <p>
                                 &nbsp;
                                <a href="#" onClick={this.handleClick.bind(this, post.id)}>Delete</a>
                                <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link> &nbsp;
                            </p>
                        </li>
                    </div>
                ))}
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

/*
 <div className="box-footer box-comments">
 <div className="box-comment">
 <img className="img-circle img-sm" src="https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg" alt="User Image" />
 <div className="comment-text">
 <span className="username">
 Luna Stark
 <span className="text-muted pull-right">8:03 PM Today</span>
 </span>
 It is a long established fact that a reader will be distracted
 by the readable content of a page when looking at its layout.
 </div>
 </div>
 </div>
 */
