import { useState, useEffect } from "react";
import axios from "axios";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Loader from "./components/Loader";

axios.defaults.baseURL = "https://pixabay.com/api/";

const App = () => {
  const key = "37430286-fda0f7503f1809cfdbbc5b6d2";
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === "") return;
    setIsLoading(true);
    axios
      .get(``, {
        params: {
          q: query,
          page,
          key,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      })
      .then(response => {
        if (response.data.hits.length === 0) {
          setError(`No results were found for '${query}' 🤬`);
          return;
        }
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setTotalPages(Math.ceil(response.data.totalHits / 12));
      })
      .catch(error => 
        setError(`Oopsie doopsie😁 Some error have occured: ${error.message} 🫵`)
      ).finally(() => setIsLoading(false))
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [images, page]);

  const handleFormSubmit = (inputQuery) => {
    setQuery(inputQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setError(null);
  };

  const handleCloseModal = () => {
    setActiveImage(null);
  };

  const handleOpenModal = image => {
    setActiveImage(image);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      {activeImage && <Modal onClose={handleCloseModal} image={activeImage} />}
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {error && <p className="Error">{error}</p>}
      {!error && <ImageGallery images={images} onImageClick={handleOpenModal} />}
      {!error && isLoading && <Loader />}
      {!error && page < totalPages && <Button onLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;
