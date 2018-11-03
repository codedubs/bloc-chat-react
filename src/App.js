import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyBuxi-yuEJ1_spmyUjCcgUKZEx3ixgUv4M",
  authDomain: "bloc-chat-react1.firebaseapp.com",
  databaseURL: "https://bloc-chat-react1.firebaseio.com",
  projectId: "bloc-chat-react1",
  storageBucket: "bloc-chat-react1.appspot.com",
  messagingSenderId: "439872249110"
};
firebase.initializeApp(config);



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

      activeRoom: " ",
      activeName: " ",
      user: " "

    }

  }


  setActiveRoom = (roomKey, roomName) => {
    this.setState({ activeRoom: roomKey });
    this.setState({ activeName: roomName });
  }

  setUser = (user) => {
    this.setState({ user: user });
    console.log(this.state.user)
  }

  componentWillMount = (roomloadname) => {
    this.setState({ activeName: roomloadname })
  }



  render() {
    console.log(this.state.activeRoom)
    console.log(this.state.activeName)
    return (
      <div className="App">
        <header className="App-Nav">

          <RoomList
            firebase = { firebase }
            setActiveRoom = { this.setActiveRoom }
            activeRoom = { this.state.activeRoom }
            componentWillMount = {this.componentWillMount}
          />

        </header>
        <section className="main">

          <User
            firebase = { firebase }
            setUser = { this.setUser }
            user = { this.state.user }
          />

          <MessageList
            firebase = { firebase }
            activeRoom = { this.state.activeRoom }
            activeName = { this.state.activeName }
            user = { this.state.user }
          />

        </section>
      </div>
    );
  }
}



export default App;
