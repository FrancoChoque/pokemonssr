/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
  const { clicked } = props;
  return (
    <div onClick={clicked} className={styles.DrawerToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

DrawerToggle.defaultProps = {
  clicked: null,
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func,
};

export default DrawerToggle;
