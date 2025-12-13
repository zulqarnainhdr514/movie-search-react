import Search from "./Search";
import {useState} from "react"; 

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
     <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="logo" />
      <h1> Find <span className="text-gradient" > Movies </span>You'll Enjoy</h1>
      </header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
       
    </main>
  )
}

export default App
