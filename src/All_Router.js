/*------------------ App ----------------------- */


import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import ItemDetail from './ItemDetail'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
    return(
        <Router> 
            <div className="App">
                <Nav/>
                <Switch> 
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/shop' exact component={Shop} />
                    <Route path='/shop/:id' component={ItemDetail} />
                </Switch>
            </div>
        </Router>
    )
}

const Home = () => {
    return(
        <div>
            <h1>Home Page</h1>
        </div>
    )
};

export default App;

/*------------------ ItemDetail ----------------------- */

import React, {useState, useEffect} from 'react';
import './App.css';

function Item({match}) {
    useEffect(() => {
        fetchItems()
        
    }, [])

    const [item, setItem] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://itunes.apple.com/search?term=radiohead');
        const jsonedItems = await data.json();
        console.log(jsonedItems.results[match.params.id])
        setItem(jsonedItems.results[match.params.id]);
    }


    return(
        <div className='info'>
            <h1 className="title">Artist: {item.artistName}</h1>
            <img src={item.artworkUrl100}/>
            <ul className='list'>
                <li >Collection: {item.collectionName}</li>
                <li>Price: {item.country}</li>
                <li>Genre: {item.primaryGenreName}</li>
                <li>TrackName: {item.trackName}</li>
            </ul>
        </div>
        )
}

export default Item;

/*------------------ Shop ----------------------- */

import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Shop() {
    useEffect(() => {
        fetchItems()
    }, [])

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://itunes.apple.com/search?term=radiohead');
        const jsonedItems = await data.json();
        console.log(jsonedItems.results)
        setItems(jsonedItems.results);
    }

    return(
        <div className='box'>
            {items.map((item)=>(
                <h3 className='songLi' key={items.indexOf(item)}>
                    <Link to={`/shop/${items.indexOf(item)}`}>
                        {item.collectionName}
                    </Link>
                </h3>
            ))}
        </div>
    )
}

export default Shop;

/*------------------ Nav ----------------------- */

import React from 'react';
import './App.css';
import {Link} from 'react-router-dom'


function Nav() {
    const navStyle = {
        color: 'white'
    }

    return(
        <nav>
            <h3>logo</h3>
            <ul className='nav-links'>
                <Link style={navStyle} to='/about'>
                    <li>About</li>
                </Link>
                <Link style={navStyle} to='/shop'>
                    <li>Shop</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;
