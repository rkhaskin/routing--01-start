import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        // called only once afte component mounted
        this.loadData();
    }

    componentDidUpdate() {
        // called second+ time
        this.loadData();
 
    }

    loadData() {
        console.log('aaaa');
        if ( this.props.match.params.id ) {
            // this.state.loadedPost.id is a number, this.props.match.params.id is a string
            // +this.props.match.params.id - plus converts string to num or use !=
            if ( !this.state.loadedPost || (this.state.loadedPost 
                && this.state.loadedPost.id !== +this.props.match.params.id) ) { 
                axios.get( '/posts/' + this.props.match.params.id )
                    .then( response => {
                        // console.log(response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;