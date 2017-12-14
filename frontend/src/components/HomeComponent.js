import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {

    render() {
        const posts = this.props.posts.list;
        const history = this.props.history;
        return (
            <div className="col-xs-12">
                <section className="content-header">
                    <h1>
                        Posts list
                        <small>All posts</small>
                    </h1>
                </section>
                <PostsList posts={posts} history={history}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(HomeComponent);
