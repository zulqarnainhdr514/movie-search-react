import Search from "./Search";
import MovieCard from "./MovieCard";
import {useEffect,useState} from "react"; 


const API_BASE_URL = "https://api.themoviedb.org/3";

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [movieList,setMoviesList] = useState([]);
  const [loading,setLoading] = useState(false);

    
  const fetchMovies = async ( query = '' ) => {

      setLoading(true);
      setErrorMessage("");


    try{
      
      const endpoint = query ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS);

   if (!response.ok) {
        throw new Error( "Network response was not ok");
      }
       
   const data = await response.json();

  
      setMoviesList(data.results);
    }
    catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
   fetchMovies(searchTerm);
  }, [searchTerm]);


  return (
    <main>
     <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="logo" />
      <h1> Find <span className="text-gradient" > Movies </span>You'll Enjoy</h1>
     
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </header>
      <section className="all-movies">
      <h2>All Movies</h2>


     {loading ? (<p className="text-white">Loading...</p> ) : errorMessage ? ( <p className="error-message">{errorMessage}</p>
     ) : 
     ( 
      <ul>
     {movieList.map((movie) => (

       <MovieCard key={movie.id}  movie = {movie} />
      ))}
      </ul>
     )
     
     }
      </section>
    </div>    
    </main>
  )
}

export default App


