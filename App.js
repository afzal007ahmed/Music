import {useState,useEffect} from 'react' ;

function App() {
let [ search , setsearch ] = useState('') ;
let [ status , setstatus ] = useState(0) ;
let [ keyword , setkeyword ] = useState([]) ;
let [ initialkey , setinitialkeyword] =  useState([] ) ;
 async function searchcall() {
 const data = await fetch(`https://v1.nocodeapi.com/doraemon123/spotify/MmbZCjSKvXlDBmHl/search?q=${search}&type=track`) ;
 const finaldata = await data.json() ;
 setkeyword(finaldata.tracks.items) ;
 }
 async function initialsearchcall() {
  const idata = await fetch(`https://v1.nocodeapi.com/doraemon123/spotify/MmbZCjSKvXlDBmHl/browse/new?country=IN&perPage=30`) ;
  const ifinaldata = await idata.json() ;
  setinitialkeyword(ifinaldata.albums.items) ;
  }
  useEffect(()=>{initialsearchcall()},[]) ;
 return (
<>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  
  <nav className="navbar bg-dark">
  <div className="container-fluid">
    <form  onSubmit = { (e) => { e.preventDefault() ; searchcall(); setstatus(1) ; }} className="d-flex w-100" role="search">
    <a href="" className="navbar-brand text-light" ><b>SOULFUL MUSIC</b></a>

      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange = { (e) => { setsearch(e.target.value) ; }}
      />
      <button className="btn btn-outline-light" type="submit">
        Search
      </button>
    </form>
  </div>
</nav>
{
  status == 1 ? <>
  <div className='fluid-container'>
  <h1 className='text-center my-4'>Search Results for {search}</h1>
    
    <div className='row'>
    {keyword.map((item) => {
     return (
      <div className="card mx-2 my-3" style={{ width: "18rem" }}>
  <img src= {`${item.album.images[0].url}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.album.name}</h5>
    <p className="card-text">{item.album.artists[0].name}
    </p>
    <audio src= {item.preview_url} className='w-100' controls>
    </audio>
  </div>
</div>

     );
    })}
    </div>
  </div>
  </>:<>
  <div className='fluid-container'>
   <div className='row'>
   <h1 className='text-center my-4'>Latest Releases 30</h1>
    
     {initialkey.map((item) => {
      return(
        <>
        <div className="card my-3 mx-2" style={{ width: "18rem" }}>
  <img src={`${item.images[0].url}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.artists.name}
    </p>
    <a href={`${item.external_urls.spotify}`} className="btn btn-primary">
      open spotify
    </a>
  </div>
</div>

        </>
      )
     })}
   </div>
  </div>
  </> 
}
</>
  );
}

export default App;
