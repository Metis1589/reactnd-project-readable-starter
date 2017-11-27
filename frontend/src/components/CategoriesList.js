import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesList extends Component {

    render() {
        const categories = this.props.categories;
        return (
            <div className="jumbotron">
                <p>
                    CategoriesList
                </p>
                <ol className="books-grid">
                    {categories.map((category) => (
                        <li key={category.path}>
                            <Link to={'/'+category.path}>{category.name}</Link>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default CategoriesList;
