/* ---------------- App -------------------- */
import React from 'react';
import './App.css';
import Nav from './Nav';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import {MovieProvider} from './MovieContext';

function App(){
    return(
        <MovieProvider>
            <div className='App'>
                <Nav />
                <AddMovie />
                <MovieList />
            </div>
        </MovieProvider>
    )
}

export default App;
/* ---------------- Nav -------------------- */
import React, {useContext} from 'react';
import './App.css';
import {MovieContext} from './MovieContext';


const Nav = () => {
    const [movies, setMovies] = useContext(MovieContext);
    return(
        <div>
            <h3>Heewon hwang</h3>
            <p>List of Movies: {movies.length}</p>
        </div>
    )
}

export default Nav;

export default Nav;
/* ---------------- MovieList -------------------- */
import React, {useState, useContext} from 'react';
import './App.css'
import Movie from './Movie';
import {MovieContext} from './MovieContext';

const MovieList = () => {
    const [movies, setMovies] = useContext(MovieContext);
    return(
        <div>
            {movies.map(movie => (
                <Movie 
                    name={movie.name}
                    price={movie.price}
                    key={movie.id} />
            ))}
        </div>
    )
}

export default MovieList; 
/* ---------------- Movie -------------------- */
import React from 'react';
import './App.css';


const Movie = ({name, price}) => {
    return(
        <div>
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    )
}

export default Movie;
/* ---------------- MovieContext -------------------- */
import React, {useState, createContext} from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
    const [movies, setMovies] = useState([
        {
            name: 'Harry Potter',
            price: '$20',
            id: 2345
        },
        {
            name: 'Game of Thrones', 
            price: '$23',
            id: 3456
        },
        {
            name: 'Inception',
            price: '$30',
            id: 98786
        }
    ]);

    return(
        <MovieContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MovieContext.Provider>
    )
}
/* ---------------- AddMovie -------------------- */
import React, {useState, useContext} from 'react';
import './App.css';
import {MovieContext} from './MovieContext';

const AddMovie = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [movies, setMovies] = useContext(MovieContext);

    const updateName = (e) => {
        setName(e.target.value);
    }
    const updatePrice = (e) => {
        setPrice(e.target.value);
    }
    const addMovie = e => {
        e.preventDefault();
        setMovies(prevMovies => [...prevMovies, {name: name, price: price}])
    }

    return(
        <form onSubmit={addMovie}>
            <input type="text" name='name' value={name} onChange={updateName}/>
            <input type="text" name="price" value={price} onChange={updatePrice}/>
            <button>Submit</button>
        </form>
    )
}

export default AddMovie;