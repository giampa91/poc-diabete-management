import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import './App.css';

function Home() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homepage</h1>
        <Link to="/">handle glycemic data</Link>
      </header>
    </div>
  );
}

export default Home;
