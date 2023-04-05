import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Style from 'Styles.module.css';
import LoadMoreButton from './LoadMoreButton';
import ApiHandler from './ApiHandler';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setPageNumber(1);
  }, [searchTerm]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowLoadMoreButton(true);
    } else {
      setShowLoadMoreButton(false);
    }
  }, [searchResults]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const results = await ApiHandler(searchTerm, 1);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const results = await ApiHandler(searchTerm, pageNumber + 1);
      setSearchResults((prevResults) => [...prevResults, ...results]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const hasMoreResults = searchResults.length % 12 === 0;

  return (
    <header className={Style.Searchbar}>
      <form className={Style.SearchForm} onSubmit={handleSearch}>
        <button type="submit" className={Style.SearchForm_button}>
          <span className={Style.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={Style.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
      {loading ? <Loader /> : <ImageGallery results={searchResults} />}
      {showLoadMoreButton && hasMoreResults && (
        <div style={{ height: '50px' }}>
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      )}
    </header>
  );
};

export default Searchbar;
