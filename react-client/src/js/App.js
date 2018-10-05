import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../css/App.css';
import Sidebar from "react-sidebar";
import MapView from './components/MapView'
import SidebarContent from './components/SidebarContent'
import Notifications from './components/Notifications';



class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
 
  componentWillUnmount() {
  }
 
 


  render() {
    return (
      <div>
        <MapView/>
        <Notifications/>
        <SidebarContent/>
      </div>
    );
  }
}

export default App;
