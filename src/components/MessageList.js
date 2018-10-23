import React, { Component } from 'react';
import ActiveRoom from './ActiveRoom';



class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state={

      messages: []

    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }


  componentDidMount() {
    this.messagesRef.on( 'child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      console.log(snapshot);
      this.setState({ messages: this.state.messages.concat(messages) });
    });
  }



    render() {


                  {
                    this.state.messages.map( (message, key) =>

                      <ul className="message" key={key}   >
                        <li>
                          { this.state.messages[key].username }
                        </li>
                        <li>
                          { this.state.messages[key].content }
                        </li>
                        <li>
                          { this.state.messages[key].sentAt }
                        </li>
                        <li> {this.state.messages[key].roomId } </li>
                      </ul>
                    ).filter( (message, key) =>
                      <ul className="filter-message" key={key} >
                        <li>
                      { this.state.messages[key].roomId   }

                        </li>
                      </ul>
                  )}

      return(

          <section className="main">
            <section className="message-list">




          </section>
        </section>

      )
    }
}



export default MessageList;
