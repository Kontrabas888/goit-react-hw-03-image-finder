import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Style from 'Styles.module.css';
import LoadMoreButton from './LoadMoreButton';

const API_KEY = '33842620-c45ae5552145e5cf17e045425';

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
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: searchTerm,
          per_page: 12,
          page: 1,
        },
      });
      const results = response.data.hits;
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: searchTerm,
          per_page: 12,
          page: pageNumber + 1,
        },
      });
      const results = response.data.hits;
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
