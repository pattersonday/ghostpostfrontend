import React, { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8000/boastsandroasts/'

class Message extends Component{
    state = {
        like: false,
        dislike: false,
        id: 0,
    }

    handleLike = event => {
        let payload = this.props.id
        axios.get(URL + payload + '/upvote')
            .then(res => res.json)
            .then(data => {
                this.setState({ like: data })
            })
            .then(res => {
                window.location.reload();
            })
    }

    handleDislike = event => {
        let payload = this.props.id
        axios.get(URL + payload + '/downvote')
            .then(res => res.json)
            .then(data => {
                this.setState({ dislike: data })
            })
            .then(res => {
                window.location.reload();
            })
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    {this.props.content}
                    <br></br>
                    {this.props.total_votes}
                    <br></br>
                    {this.props.post_date}
                </div>
                <button onClick={this.handleLike}>Upvote</button>
                <button onClick={this.handleDislike}>Downvote</button>
            </React.Fragment>
        )
    }
}

export default Message;