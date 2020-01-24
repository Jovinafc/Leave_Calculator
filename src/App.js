import React from 'react';
import logo from './logo.svg';
import './App.css';

import CalendarH from './containers/Calendar/Calendar';
import events from '../src/containers/Calendar/events';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>Hello</div>
      <CalendarH  myEventsList={events}/>
    </div>
  );
}

export default App;
