import React from 'react';
import { Link } from "react-router";
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Homepage</h1>
        <nav>
          <Link to="/" className="nav-link">Glycemic Data</Link>
        </nav>
        <nav>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
