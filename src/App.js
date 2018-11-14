import React, { Component } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import { API_URL } from './config'
import './App.css'

const socket = io(API_URL)

class App extends Component {


  render() {
    return (
      <div className={"wrapper"}>
        <div className={"grid-container"}>
          <div className={"item"}></div>
          <div className={"item"}>AD</div>
          <div className={"item"}>IDAM</div>
          <div className={"item"}>OpenLdap</div>
          <div className={"item"}>Oauth2.0</div>
          <div className={"item"}>
            <OAuth 
              provider={'github'}
              socket={socket}
            />
          </div>
          <div className={"item"}>7</div>
          <div className={"item"}>8</div>
          <div className={"item"}>SAML</div>
          <div className={"item"}>10</div>
          <div className={"item"}>11</div>
          <div className={"item"}>12</div>
          <div className={"item"}>OpenID Connect</div>
          <div className={"item"}>14</div>
          <div className={"item"}>15</div>
          <div className={"item"}>16</div>
      </div>
    </div>
    );
  }
}

export default App;
