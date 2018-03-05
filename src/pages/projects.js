import React from 'react';

import ofImg from '../images/optical-flow.png';
import geoJsonImg from '../images/react-geojson.png';
import sfcgLogo from '../images/sfcg-logo.png';
import goodybagLogo from '../images/goodybag-logo.png';
import customixLogo from '../images/customix-logo.png';
import eyeqLogo from '../images/eyeq-logo.webp';
import megasLogo from '../images/megas-logo.png';

const companyData = [
  {title: 'SFCG', logo: sfcgLogo},
  {title: 'Goodybag', logo: goodybagLogo},
  {title: 'CustoMix Nutrition', logo: customixLogo},
  {title: 'eyeQ Insights', logo: eyeqLogo},
  {title: 'Megas Manufacturing', logo: megasLogo}
];

const projectData = [
  {
    title: 'Dash Cam Optical Flow',
    image: ofImg,
    description: 'I wanted to explore how well a vehicles motion could be determined using simple feature detection algorithms. This was an experimental side project to better my understanding of SLAM.',
    link: {text: 'Video Demo', href: 'https://www.youtube.com/watch?v=muIqVPjN5pM'}
  },
  {
    title: 'React GeoJSON',
    image: geoJsonImg,
    description: 'React Geo-JSON Cluster is a react module that will generate marker clusters from geo-json data.',
    link: {text: 'Live Demo', href: 'http://paulserraino.github.io/react-geojson-cluster'}
  },

]

const projectItems = projectData.map((p, i) => (
  <li key={i}>
    <div className="projects__div--row">
      <div className="projects__div--col">
        <h4>{p.title}</h4>
        <p>{p.description}</p>
        <a target="__blank" href={p.link.href}>{p.link.text}</a>
      </div>
      <div className="projects__div--col">
        <img className="projects__img" src={p.image} />
      </div>
    </div>
  </li>
));

const companyItems = companyData.map((c, i) => (
  <li key={i}>
    <div className="projects__div--logo-container">
      <img className="projects__img--company-logo" src={c.logo} />
      <div className="projects__div--company-title">{c.title}</div>
    </div>
  </li>
));

const ProjectsPage = (props) => (
  <div className="projects__div--container">
    <div className="projects__div--client-section">
      <h2 className="projects__div--section-title">Clients.</h2>
      <p>{`I've had a the great pleasure to work as both a contractor and full-time employee
      at some of these amazing companies.`}</p>
      <div className="projects__div--companies">
        <ul className="projects__ul--companies">
          {companyItems}
        </ul>
      </div>
    </div>
    <h2 className="projects__div--section-title">Side Projects.</h2>
      <ul className="projects__ul">
        {projectItems}
      </ul>
  </div>
);

export default ProjectsPage;
