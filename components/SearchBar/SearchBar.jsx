import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';


const SearchBar = (props) => {
  const {
    placeholder, value, textChanged, clicked, disabled, onKeyPress,
  } = props;
  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => textChanged(event.target.value)}
        onKeyPress={onKeyPress}
      />
      <button
        type="button"
        title="Buscar"
        onClick={clicked}
        disabled={disabled}
        className={disabled ? styles.ButtonDisabled : styles.Button}
      >
        Buscar
      </button>
    </div>
  );
};

SearchBar.defaultProps = {
  placeholder: '',
  value: '',
  onKeyPress: null,
  textChanged: null,
  clicked: null,
  disabled: false,
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onKeyPress: PropTypes.func,
  textChanged: PropTypes.func,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SearchBar;
