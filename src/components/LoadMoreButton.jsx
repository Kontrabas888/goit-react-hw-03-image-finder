import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const LoadMoreButton = ({ onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div style={{ height: '50px' }}>
      <Button onClick={handleClick}>Load More</Button>
    </div>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
