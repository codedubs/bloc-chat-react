import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import ActiveRoom from './components/ActiveRoom';



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




    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-Nav">

          <RoomList
            firebase = { firebase }
          />

        </header>

        <ActiveRoom
          firebase = { firebase }
        />

        <MessageList
          firebase = { firebase }
        />


      </div>
    );
  }
}



export default App;
