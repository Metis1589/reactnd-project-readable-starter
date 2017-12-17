import React, { Component } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
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
                <Link className="btn btn-primary btn-sm pull-right" to="/post-create">
                    <i className="fa fa-plus"/> Create new post
                </Link>
                <br /><br />
                {posts.length>0 && (
                    <div>
                        <div style={{ padding: '5px'}}>
                            Show posts ordered by:
                            <a href="" style={{fontStyle: orderBy=='timestamp' ? 'italic' : 'normal'}} onClick={this.handleOrderByClick.bind(this, 'timestamp')}> &nbsp;
                                <i className="fa fa-clock-o"/> date {orderBy=='timestamp' && (<span>(current order)</span>)}
                            </a>
                            <a href="" style={{fontStyle: orderBy=='voteScore' ? 'italic' : 'normal'}} onClick={this.handleOrderByClick.bind(this, 'voteScore')}> &nbsp;
                                <i className="fa fa-thumbs-up"/> popularity  {orderBy=='voteScore' && (<span>(current order)</span>)}
                            </a>
                        </div>
                        {posts.map((post) => (
                            <Post post={post} history={history} key={post.id} detailView={false}/>
                        ))}
                    </div>
                )}
                {posts.length==0 && (
                    <div className="box box-widget">
                        <div className="box-header with-border">
                            <i>No postings were found</i>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PostsList;