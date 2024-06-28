import React from 'react';
import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Home</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noogpener noreferrer"
        >
          Learn Reacttt
        </a>
      </header>
    </div>
  );
}

export default Home;
