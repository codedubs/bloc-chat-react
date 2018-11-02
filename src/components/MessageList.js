import React, { Component } from 'react';




class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {

      messages: [],
      newMessage: " "

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


  createMessage(e) {
    this.setState({ newMessage: e.target.value });
  }


  sendMessage(e) {

    if (!this.props.activeRoom) {
        return null;
      } else if (this.props.activeRoom) {
        this.setState({ messages: [...this.state.messages, this.state.newMessage]});
        this.messagesRef.push({
          content: this.state.newMessage,
          roomId: this.props.activeRoom,
          username: this.props.user.displayName,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP });
        console.log(this.state.messages)
        console.log(this.props.activeRoom)
        this.setState({ newMessage: "" });
      }
  }


  formatTime(sentAt, key) {

    const minutes = Math.floor(sentAt / 360000000000);
    const seconds = Math.floor(((sentAt / 6000000000000) ) * 60);

    if (sentAt) {
      return minutes + ":" + (seconds < 10 ? ("0" + seconds ) : seconds + " pm");
    } else {
      return "-:--"
    }
  }



  render() {

      return(

          <section className="message-room">
            <section className="message-area">
            <span className="roomNum"><h4> {this.props.activeName} </h4></span>

                { this.state.messages.map( (message, key) =>
                  <ul className="messages" key ={ key}>
                    <li className="username">
                      {this.state.messages[key].username}
                    </li>
                    <li className="content">
                      {this.state.messages[key].content}
                    </li>
                    <li id="time">
                      { this.formatTime(this.state.messages[key].sentAt)}
                    </li>

                  </ul>
                  ).filter( (message,key) =>
                  this.state.messages[key].roomId === this.props.activeRoom
                )
              }
            </section>
        <section className="textbar">
          <input type='text' className='message' class="form-control" value={ this.state.newMessage } placeholder="Type your message..." onChange={ (e) => this.createMessage(e) }/>
          <button type="button" className="send-button" onClick={ () => this.sendMessage() } > Send </button>
        </section>
    </section>
      )
    }
}



export default MessageList;
