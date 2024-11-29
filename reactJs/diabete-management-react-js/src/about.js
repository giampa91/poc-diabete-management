import React, { useEffect, useState } from 'react';
import './App.css';

import { Link } from "react-router";

function About() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/home">Homepage</Link>
        <h1>This is about page</h1>
      </header>
    </div>
  );
}

export default About;
