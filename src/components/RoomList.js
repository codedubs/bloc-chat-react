import React, { Component } from 'react';
import Modal from './Modal';




class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',
      isOpen: false

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }



handleSubmit(e) {
  e.preventDefault();
  const newRoom = { name: this.state.newRoomName };
  if (!this.state.rooms) {
    return
  } else if (this.state.rooms) {
    this.setState({ rooms: [...this.state.rooms, newRoom] });
    this.roomsRef.push({ name: this.state.newRoomName })
    this.setState({ newRoomName: "" });
    this.setState({ isOpen: !this.state.isOpen });

  }
}


createRoom(e) {
  this.setState({ newRoomName: e.target.value });
}


toggleModal() {
  this.setState({ isOpen: !this.state.isOpen });
}


componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) });
  });
}




render() {

    return (
      <section className="roomlist">

        <section className="sidenav">

          <li className="sideheader"><h1><strong> Bloc Chat </strong></h1><button onClick={ () => this.toggleModal() }> New Room </button></li>

          {
            this.state.rooms.map( (room, key) =>
              <ul className="rooms" key={key}>
              <li>
                <a href=''> { this.state.rooms[key].name } </a>
              </li>
              </ul>
          )}

        </section>

      <section className="main">

          <Modal show={ this.state.isOpen }
            onClose={ () => this.toggleModal() }
            newRoomName={ this.state.newRoomName }
            createRoom= { (e)=> this.createRoom(e) }
            handleSubmit={ (e) => this.handleSubmit(e) }
            >

          </Modal>
      </section>
    </section>
    );
  }
}



export default RoomList;
