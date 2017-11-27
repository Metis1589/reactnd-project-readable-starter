import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {

    render() {
        const categories = this.props.categories.list;
        const posts = this.props.posts.list;
        return (
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
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

export default connect(mapStateToProps)(HomeComponent);
