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
  if (!this.state.rooms) { return }
  const newRoom = { name: this.state.newRoomName };
  this.setState({ rooms: [...this.state.rooms, newRoom] });
}


createRoom(e) {
  this.setState({ newRoomName: e.target.value })
}


toggleModal() {
  this.setState({ isOpen: !this.state.isOpen });
}


componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  console.log(snapshot);
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
              <ul>
                <li>
                  <span className="rooms" key={key}> { this.state.rooms[key].name } </span>
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
