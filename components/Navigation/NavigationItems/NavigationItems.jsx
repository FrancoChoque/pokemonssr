import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/">
        Pokefinder
    </NavigationItem>
    <NavigationItem link="/favorites">
      Favorites
    </NavigationItem>
  </ul>
);

export default navigationItems;
