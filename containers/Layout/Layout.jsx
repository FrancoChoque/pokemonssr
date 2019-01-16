import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Navigation/Footer/Footer';
import styles from './Layout.module.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler() {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  }

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <div className={styles.Container}>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          opened={showSideDrawer}
          toggle={this.sideDrawerToggleHandler}
        />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    );
  }
}

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
