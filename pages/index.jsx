import React from 'react';
import Layout from '../containers/Layout/Layout';
import Finder from '../containers/Finder/Finder';
import './index.css';

const Main = () => (
  <div className="App">
    <Layout>
      <Finder />
    </Layout>
  </div>
);

export default Main;
