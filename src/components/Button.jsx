import React from 'react';
import Style from 'Styles.module.css';

const Button = ({ onClick }) => (
  <div className={Style.Button}>
    <button type="button" className={Style.Button_tup} onClick={onClick}>
  Load more
</button></div>
  

);

export default Button;
