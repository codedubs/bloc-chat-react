import React, { Component } from 'react';




class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }


  return (
      <div className="backdrop" >



        <form id="roomForm" onSubmit={this.props.handleSubmit}>
          <h3><strong>Create a new room</strong></h3>
          <label for="roomInput"> <h5>Enter a room name </h5></label> <br></br>
          <input type="text" id="roomInput" value={ this.props.newRoomName } onChange={ this.props.createRoom }/>  <br></br><br></br>

          <input type="submit" value="Cancel" onClick={ this.props.onClose }/>&nbsp;
          <input type="submit" value="Create room" />
        </form>

      </div>
    );
  }
}



export default Modal;
