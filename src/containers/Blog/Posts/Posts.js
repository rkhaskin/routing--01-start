import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import './Posts.css';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        console.log("aaa "+ this.props);

        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                 console.log( response );
            } )
            .catch(error => {
                 console.log("hhh "+ error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                <Link to={this.props.match.url+'/'+post.id} key={post.id}>
                    <Post 
                        title={post.title} 
                        author={post.author}
                        />;
                </Link>
                )
            });
        }
        
        return (

            <div className="Blog">
            <section className="Posts">
                {posts}
            </section>
            <Route path='/posts/:id' exact component={FullPost} />

        </div>            
        );
    }

}

export default Posts; 