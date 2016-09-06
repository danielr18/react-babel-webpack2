// Dependencies
import React from 'react';

// Components
import Header from '../header/Header.jsx';
import Content from '../content/Content.jsx';
import Footer from '../footer/Footer.jsx';

// Styles
import './App.scss';

const App = () =>
  <div className="site-wrapper">
    <Header />
    <Content />
    <Footer />
  </div>;

export default App;
