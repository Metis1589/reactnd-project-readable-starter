import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActionTypes from '../store/posts/actionTypes';
import { Link } from 'react-router-dom';

class CategoryComponent extends Component {

    render() {
        const categories = this.props.categories.list;
        const category = this.props.match.params.category;
        const posts = this.props.posts.list.filter(function (post) {
            if (post.category==category) {
                return post
            }
        });
        return (
            <div>
                {category!='post-create' && category!='add-comment' && (
                    <div className="row">
                        <div className="col-md-4">
                            <CategoriesList categories={categories} />
                        </div>
                        <div className="col-md-8">
                            <PostsList posts={posts} />
                            <br />
                            <Link to="/post-create">Create Post</Link>
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

export default connect(mapStateToProps)(CategoryComponent);
