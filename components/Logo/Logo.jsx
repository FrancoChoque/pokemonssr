import React from 'react';
import styles from './Logo.module.css';

const logo = () => (
  <div className={styles.Logo}>
    <img src="/static/logo.png" alt="Pokémon" />
  </div>
);

export default logo;
