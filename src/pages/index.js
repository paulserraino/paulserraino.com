import React from 'react'
import Link from 'gatsby-link'
import Skills from '../components/Skills';
import GromMan from '../components/GromMan';

// assets
import manSvg from '../images/grom-man.svg';
import homeCard from '../images/home-card.png';

const renderGromMan = () => (
  window.innerWidth <= 510 ?
  null :
  (<GromMan viewbox="50 0 290 400"/>)
);

const IndexPage = () => (
  <div className="index__div--container">
    <div className="index__div--col index__div--card">
      <img src={homeCard} className="index__img--card" />
      <Skills />
    </div>
    <div className="index__div--col">
      {renderGromMan()}
    </div>
  </div>
)

export default IndexPage
