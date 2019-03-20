import React, { Component } from 'react';
import './App.css';
import 'bootstrap'
import './ThreadDisplay/components/ThreadDisplay';
import ThreadDisplay from "./ThreadDisplay/components/ThreadDisplay";
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
  constructor(props){
    super(props);

    const config = {
      apiKey: "AIzaSyAaw8P28-KT34O4eytHj3IqRZVyyQPdVn4",
      authDomain: "finalforum-64958.firebaseapp.com",
      databaseURL: "https://finalforum-64958.firebaseio.com",
      projectId: "finalforum-64958",
      storageBucket: "finalforum-64958.appspot.com",
      messagingSenderId: "450052579459"
    };

    this.app = firebase.initializeApp(config);
    this.database = this.app.database();
  }
  render() {
    return (
      <ThreadDisplay database = {this.database}/>
    );
  }
}

export default App;
