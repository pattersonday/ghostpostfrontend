import React, { Component } from 'react';
import Message from './Message.js';

class Messages extends Component {
    
    render() {
        return (
            <React.Fragment>
                {this.props.all_messages.map(message => 
                    <Message
                        id={message.id}
                        content={message.content}
                        total_votes={message.total_votes}
                        post_date={message.post_date}
                        />
                )}
            </React.Fragment>
        )
    }
}

export default Messages;