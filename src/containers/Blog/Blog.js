import React, { Component } from 'react';
import './Blog.css';
import Posts from '../../containers/Blog/Posts/Posts';
import AsyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';
import {Route, Link, Switch, Redirect} from 'react-router-dom';

// webpack creates a separate js file for each component wrapped in the asyncComponent.
// this bundle will be loaded when the component is refernced in the code in the Route. 
// Only when this constant is used, the below code will get executed
const NewPostAsyncComponent = AsyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {


    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/posts">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>

                </header>
                <Switch>
                    <Route path="/new-post" exact component={NewPostAsyncComponent} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;