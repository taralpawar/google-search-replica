import React, {useState, useEffect} from 'react';
import "./App.css"
import { IconButton } from '@mui/material';
import { Close, NavigateNext, NavigateBefore, SearchOutlined} from '@mui/icons-material';
import Logo from './assets/Google__G__logo.svg.png';

function App() {
  const [results, setResults] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);


  const getResults = async () => {
      try{
          const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=50`);
          const res = await response.json();
          setResults(res);
      }
      catch(e){
          console.error(e);
      }
  }

  useEffect(() => {
      getResults();
  }, [page]);

  const handleImageClick = (image) => {
    setSelectedImg(image);
  }

  const selectBefore = () => {
    let selectedId = parseInt(selectedImg.id);
    setSelectedImg(results.find((img) => parseInt(img.id) === selectedId - 1));
    
  }

  const selectNext = () => {
    let selectedId = parseInt(selectedImg.id);
    setSelectedImg(results.find((img) => parseInt(img.id) === selectedId + 1));
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSelectedImg(null);
      setPage(newPage);
    }
  };

  return (
    <div className="App">
      
      {/* Search Bar */}
      <div className="search-bar">
      <img className='logo' src={Logo} />
        <input
          type="text"
          placeholder="Search for images..."
        />
        <IconButton>
          <SearchOutlined />
        </IconButton>
      </div>

      {/* Image Grid */}
      <div className="results-container">
        <div className="image-results">
          {results.map((image) => (
            <div key={image.id} className="image-card" style={{backgroundColor: selectedImg && image.id === selectedImg.id ? "lightblue" : ""}} onClick={() => handleImageClick(image)}>
              <img src={image.download_url} alt={image.author} />
              <p>{image.author}</p>
            </div>
          ))}
        </div>
        {console.log(results, selectedImg)}
        {selectedImg && (
          <div className="side-pane">
            <div className='side-pane-header'>
              <h2>{selectedImg.author}</h2>
              <div className='side-pane-controls'>
              <IconButton onClick={selectBefore}>
                <NavigateBefore />
              </IconButton>
              <IconButton onClick={selectNext}>
                <NavigateNext />
              </IconButton>
              <IconButton onClick={() => setSelectedImg(null)}>
                <Close />
              </IconButton>
              </div>
            </div>
            <img src={selectedImg.download_url} alt={selectedImg.author} />
            {/* <p>{selectedImg.description}</p> */}
          </div>
        )}

        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
      </div>
    </div>
  );
}

export default App;
