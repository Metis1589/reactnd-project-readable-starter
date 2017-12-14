import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActions from '../store/posts/actions';
import uuid from 'uuid';

class PostEditComponent extends Component {

    state = {
        post: null,
        post_id: null
    }

    handleSubmit(e) {
        e.preventDefault();
        const props = this.props;
        const {post, post_id} = this.state;
        if (post_id) {
            ClientAPI.updatePost(post_id, post)
                .then(() => {
                    props.updatePost(post);
                    props.history.goBack();
                });
        } else {
            post.timestamp = Date.now();
            post.id = uuid();
            ClientAPI.createPost(post)
                .then((post) => {
                    props.createPost(post);
                    props.history.goBack();
                });
        }
    }

    handleChange(field, e) {
        const post = Object.assign({}, this.state.post, {[field]: e.target.value});
        this.setState(Object.assign({}, this.state, {post}));
    }

    componentDidMount() {
        let props = this.props;
        const post_id = props.match.params.post_id;
        if(post_id){
            this.setState({post_id: post_id});
            ClientAPI.getPost(post_id)
                .then((post) => {
                    props.getPost(post);
                    this.setState({post: post});
                });
        }
        else
        {
            const post = {
                "id": "",
                "timestamp": "",
                "title": "",
                "body": "",
                "author": "",
                "category": "",
                "voteScore": 0,
                "deleted": false,
                "commentCount": 0
            }
            this.setState({post: post});
        }
    }

    render() {
        const { post_id, post } = this.state;
        const categories = this.props.categories.list;
        return (
            <div className="col-xs-12">
                <section class="content-header">
                    <h1>
                        Post {post_id ? 'edit' : 'create' }
                    </h1>
                </section>
                <br />
                {post && (
                    <div>
                        <div>
                            <form onSubmit={this.handleSubmit.bind(this)} noValidate>

                                <div className="form-group">
                                    <label className="label-control">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={post.title}
                                        onChange={this.handleChange.bind(this, 'title')}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label-control">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={post.author}
                                        onChange={this.handleChange.bind(this, 'author')}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label-control">Body</label>
                                      <textarea
                                          className="form-control"
                                          value={post.body}
                                          onChange={this.handleChange.bind(this, 'body')}
                                      />
                                </div>

                                <div className="form-group">
                                    <label className="label-control">Category</label>
                                      <select
                                          label="Select category"
                                          className="form-control"
                                          value={post.category}
                                          onChange={this.handleChange.bind(this, 'category')}
                                      >
                                          <option>Select category</option>
                                          {categories.map((category) => (
                                              <option key={category.path}>{category.name}</option>
                                          ))}
                                      </select>
                                </div>

                                <button type="submit" className="btn btn-default">
                                    {post.id ? 'Update' : 'Create' } Post
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
        categories: state.categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getPost: (data) => dispatch(postsActions.fetchPost(data)),
        createPost: (data) => dispatch(postsActions.createPost(data)),
        updatePost: (data) => dispatch(postsActions.updatePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditComponent);
