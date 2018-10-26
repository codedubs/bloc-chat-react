import React, { Component } from 'react';



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

      return(

          <section className="message-room">
          <span className="roomNum"><h4> {this.props.activeName} </h4></span>

              { this.state.messages.map( (message, key) =>
                <ul className="messages" key ={ key}>
                  <li className="username">
                    {this.state.messages[key].username}
                  </li>
                  <li className="content">
                    {this.state.messages[key].content}
                  </li>
                  <li className="time">
                    {this.state.messages[key].sentAt}
                  </li>
                </ul>
                ).filter( (message,key) =>
                this.state.messages[key].roomId === this.props.activeRoom
                )
              }

        </section>

      )
    }
}



export default MessageList;
