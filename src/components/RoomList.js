import React, { Component } from 'react';





class RoomList extends Component {

  constructor(props) {
    super(props);


    this.state = {
      rooms: []

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(snapshot);
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }


  render() {
    return (

        <section className="sidenav">
            <li className="sideheader"><h1><strong>Bloc Chat </strong></h1></li>
          {
            this.state.rooms.map( (room, key) =>
              <ul>

                <li>
                  <span className="rooms" key={key}> {this.state.rooms[key].name } </span>
                </li>
              </ul>

          )}

        </section>

    );
  }
}



export default RoomList;
