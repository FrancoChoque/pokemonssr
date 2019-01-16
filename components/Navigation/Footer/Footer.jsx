import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.Footer}>
    <p>Creado por Franco Choque</p>
    <a
      style={{ textDecoration: 'none' }}
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/FrancoChoque/pokefinder"
    >
      <p>Link al repo</p>
    </a>
  </footer>
);

export default Footer;
