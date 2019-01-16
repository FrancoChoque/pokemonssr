import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  const { opened } = props;
  const { closed } = props;
  const { toggle } = props;
  if (opened) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }

  return (
    <Aux>
      <Backdrop show={opened} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div style={{ height: '11%', marginBottom: 32 }}>
          <Logo style={{ height: '100%' }} clicked={toggle} />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.defaultProps = {
  opened: false,
  toggle: null,
  closed: null,
};

SideDrawer.propTypes = {
  opened: PropTypes.bool,
  toggle: PropTypes.func,
  closed: PropTypes.func,
};

export default SideDrawer;
