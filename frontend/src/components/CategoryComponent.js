import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as ClientAPI from '../utils/APIClient';
import * as postsActionTypes from '../store/posts/actionTypes';
import { Link } from 'react-router-dom';

class CategoryComponent extends Component {

    render() {
        const history = this.props.history;
        const categoryToken = this.props.match.params.category;
        const posts = this.props.posts.list.filter(function (post) {
            if (post.category==categoryToken) {
                return post
            }
        });
        let selectedCategory = this.props.categories.list.filter(function (category) {
            if (category.path==categoryToken) {
                return category
            }
        });
        if(selectedCategory.length > 0){
            selectedCategory = selectedCategory[0]['name'];
        }
        return (
            <div>
                {categoryToken!='post-create' && categoryToken!='add-comment' && (
                    <div className="col-xs-12">
                        <section className="content-header">
                            <h1>
                                Category "{selectedCategory}" posts
                            </h1>
                        </section>
                        <PostsList posts={posts} history={history}/>
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
