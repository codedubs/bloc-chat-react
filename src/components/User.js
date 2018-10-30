import React, { Component } from 'react';




class User extends Component {

  constructor(props) {
    super(props);

    this.state ={

      user: " ",
setUsername: " ",
username: " ",
      error: " "
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }



  componentDidMount() {

    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }


  googleSignIn = () => {

    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
    .auth()
    .signInWithPopup(provider)
    .then( result => {
      var token = result.credential.accessToken;
      var user = result.user;

 this.setState({ user: user.displayName })

      console.log(this.state.user) })
    .catch( error => {
      this.setState({ error: 'Authentication failed.'})
    });
  }

  googleSignOut = () => {

    this.props.firebase
    .auth()
    .signOut()
    .then( () => {
      this.setState({ username: null }); })
    .catch( error => {
      this.setState({ error: 'An error has occured.'})
    });
  }



  handleUsername(e) {
    e.preventDefault();

    if (this.state.setUsername) {
      this.setState({ username: this.state.setUsername });

      this.messagesRef.push({ username: this.state.setUsername })
      this.setState({ setUsername: "" });
      this.setState({ isOpen: !this.state.isOpen });
    } else if (!this.state.setUsername) {
           return
      }
  }


  createName(e) {
    this.setState({ setUsername: e.target.value });
  }



  render() {

console.log(this.props.user.displayName)
    return(

      <span className="main">
        <p> {this.props.user.displayName ? this.props.user.displayName : "GUEST" } is logged in</p>
        <br></br>
        <button type="button" className="signin-button" onClick={ () => this.googleSignIn()} >
          Google sign in
        </button>
        <button type="button" className="signin-button" onClick={ () => this.googleSignOut() }>
          Google sign out
        </button>



  <form id="usernameForm" onSubmit={ (e) => this.handleUsername(e)}>
    <h3><strong>Set a username</strong></h3>
    <label for="usernameInput"> <h5>This name will appear when you send messages</h5></label> <br></br>
    <input type="text" id="usernameInput" value={this.state.setUsername} onChange={ (e) => this.createName(e) }/>  <br></br><br></br>
    <input type="submit" value="Set username" />
  </form>



      </span>
    )
  }
}


export default User;
