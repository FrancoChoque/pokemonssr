/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const { link } = props;
  const { children } = props;
  return (
    <li className={styles.NavigationItem}>
      <Link href={link}>
        <a>{children}</a>
      </Link>
    </li>
  );
};


NavigationItem.defaultProps = {
  link: null,
  children: null,
};

NavigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.string,
};

export default NavigationItem;
