import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import '../styles/style.css';
// import variables from '../styles/SampleHome.modele.scss'

export const SampleHome: React.FC = () => {
  const componentName = "Home";
  return (
    <>
      <Helmet>
        <title>{componentName}</title>
      </Helmet>
      <title>My Blog</title>
      <Link to="/web-development-tsuji">HOME</Link>
      <br />
      <Link to="page1">PAGE1</Link>
      <br />
      <Link to="page2">PAGE2</Link>
    </>
  );
}