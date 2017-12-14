import React, { Component } from 'react';
import Post from './Post';
import sortBy from 'sort-by';

class PostsList extends Component {

    state = {
        orderBy: 'timestamp'
    }

    handleOrderByClick(orderByField, e) {
        e.preventDefault();
        this.setState({orderBy:orderByField});
    }

    handleAddPostClick(link, e) {
        e.preventDefault();
        this.props.history.push(link);
    }

    render() {
        const posts = this.props.posts;
        const history = this.props.history;
        const orderBy = this.state.orderBy;
        posts.sort(sortBy('-' + this.state.orderBy));
        return (
            <div>
                <button type="button" className="btn btn-primary btn-sm pull-right"
                        onClick={this.handleAddPostClick.bind(this, `/post-create`)}>
                    <i className="fa fa-plus"/> Create new post
                </button>
                <br />
                <div style={{ padding: '5px'}}>
                    Show posts ordered by:
                    <a href="" style={{fontFamily: orderBy=='timestamp' ? 'bold' : 'normal'}} onClick={this.handleOrderByClick.bind(this, 'timestamp')}> &nbsp;
                        <i className="fa fa-clock-o"/> date
                    </a>
                    <a href="" style={{fontFamily: orderBy=='voteScore' ? 'bold' : 'normal'}} onClick={this.handleOrderByClick.bind(this, 'voteScore')}> &nbsp;
                        <i className="fa fa-thumbs-up"/> popularity
                    </a>
                </div>
                {posts.map((post) => (
                    <Post post={post} history={history} key={post.id}/>
                ))}
            </div>
        );
    }
}

export default PostsList;