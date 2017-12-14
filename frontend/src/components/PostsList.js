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

    render() {
        const posts = this.props.posts;
        const history = this.props.history;
        const orderBy = this.state.orderBy;
        posts.sort(sortBy('-' + this.state.orderBy));
        return (
            <div>
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
