import React, { Component } from 'react';




class User extends Component {

  constructor(props) {
    super(props);

    this.state ={
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
      var user = result.user;})
    .catch( error => {
      this.setState({ error: 'Authentication failed.'})
    });
  }

  googleSignOut = () => {

    this.props.firebase
    .auth()
    .signOut()
    .catch( error => {
      this.setState({ error: 'An error has occured.'})
    });
  }




  render() {


    return(

      <section className="sign-in">
        <p> {this.props.user ? this.props.user.displayName : "GUEST" } is logged in</p>
        <br></br>
        <button type="button" className="signin-button" onClick={ () => this.googleSignIn()} >
          Google sign in
        </button>
        <button type="button" className="signin-button" onClick={ () => this.googleSignOut() }>
          Google sign out
        </button>
      </section>
    )
  }
}


export default User;
