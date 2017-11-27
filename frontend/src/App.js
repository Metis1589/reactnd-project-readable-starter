import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import PostsList from './components/PostsList';
import PostComponent from './components/PostComponent';
import CategoryComponent from './components/CategoryComponent';
import PostEditComponent from './components/PostEditComponent';
import store from './store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import * as ClientAPI from './utils/APIClient';
import { categoriesActions } from './store/categories/index';
import { postActions } from './store/posts/index';
import * as categoriesActionTypes from './store/categories/actionTypes';
import * as postsActionTypes from './store/posts/actionTypes';

class App extends Component {
    componentDidMount() {
        let props = this.props;
        ClientAPI.getCategoriesList()
            .then((categories) => {
                props.dispatch({type: categoriesActionTypes.FETCH_CATEGORIES, payload: categories});
            });
        ClientAPI.getPostsList()
            .then((posts) => {
                props.dispatch({type: postsActionTypes.FETCH_POSTS, payload: posts});
            });
    }
    render() {
        return (
            <div className="app">
                <Route path='/' exact component={HomeComponent} />
                <Route path='/post-create' exact component={PostEditComponent}/>
                <Route path='/:category' exact component={CategoryComponent}/>
                <Route path={"/:category/:post_id/"} exact component={PostComponent}/>
                <Route path={"/:category/:post_id/edit/"} exact component={PostEditComponent}/>
            </div>
        )
    }
}

export default withRouter(connect()(App));

