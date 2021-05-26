import React from 'react';
import About from './About';
import Search from './Search';
import Nav from './Nav';
import './App.css';
import {BrowserRounter as Router, Switch, Route} from 'react-router-dom';

function App (){
  return(
    <Router>
      <div className='App'>
        <Nav />
        <About />
        <Search />
      </div>
    </Router>
  )
}

export default App;
