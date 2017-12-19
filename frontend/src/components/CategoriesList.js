import React, { Component } from 'react';
import { Sidebar } from 'react-adminlte-dash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CategoriesList extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    handleNavigationClick(link, e) {
        e.preventDefault();
        this.props.history.push(link);
    }

    render() {
        const categories = this.props.categories.list;
        return (
            <Sidebar.Menu header="CATEGORIES" key="home">
                <Sidebar.Menu.Item icon={{className:'fa fa-navicon'}} title="Home" onClick={this.handleNavigationClick.bind(this, '/')}/>
                {categories.map((category) => (
                    <Sidebar.Menu.Item icon={{className:'fa fa-navicon'}} title={category.name} key={category.path} onClick={this.handleNavigationClick.bind(this, '/'+category.path)}/>
                ))}
            </Sidebar.Menu>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList);