import React from 'react';

// assets
import angularLogo from '../../images/angular-logo.png';
import reactLogo from '../../images/react-logo.png';
import nodeLogo from '../../images/node-logo.png';
import dockerLogo from '../../images/docker-logo.png';
import postgresLogo from '../../images/postgresql-logo.png';
import mongodbLogo from '../../images/mongodb-logo.png';
import rabbitmqLogo from '../../images/rabbitmq-logo.png';

export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.skillsData = [
      {logo: angularLogo, skill: "Angular", description: "I'm a master at building data-driven UIs with AngularJs."},
      {logo: reactLogo, skill: "React", description: "I love using ReactJs. It's my go-to component framework."},
      {logo: nodeLogo, skill: "Node", description: "I have over 4 years of experience building fast and scalable web servers with NodeJs."},
      {logo: dockerLogo, skill: "Docker", description: "I have a ton of experience using Docker in production."},
      {logo: postgresLogo, skill: "PostgreSQL", description: "I use PostgreSQL when I need a relational database."},
      {logo: mongodbLogo, skill: "MongoDB", description: "I have experience building data processing pipelines with MongoDB."},
      {logo: rabbitmqLogo, skill: "RabbitMQ", description: "I care about providing low-latency web services. I relay on RabbitMq to distribute work across systems."}
    ];

    this.state = {
      currentSkill: null,
      fadding: false
    };
  }

  resetCurrentSkill() {
    this.setSkill(null);
  }

  changeCurrentSkill(skill) {
    let result = this.skillsData.filter(s => s.skill === skill);
    this.setSkill(result.length > 0 ? result[0] : null);
  }

  setSkill(skill) {
    this.setState({
      currentSkill: skill,
      fadding: false
    });

    this.raf(() => {
      this.setState({fadding: true})
    }, 1);
  }

  raf(fn) {
    setTimeout(() => {
      if (window && window.requestAnimationFrame) window.requestAnimationFrame(fn)
      else fn.call(this);
    }, 1);
  }

  renderSkill(d, i) {
    return (
      <li key={d.skill} onMouseEnter={this.changeCurrentSkill.bind(this, d.skill)}>
        <img className="skills-container__img" src={d.logo} alt={d.skill} />
      </li>
    );
  }

  render() {
    const skillsTop = this.skillsData.slice(0, 4).map(this.renderSkill.bind(this));
    const skillsBottom = this.skillsData.slice(4, 8).map(this.renderSkill.bind(this));
    const descriptionClass = "skills__p animated-slow " + (this.state.fadding ? "fadeIn" : "");
    const currentSkill = this.state.currentSkill;
    const description = currentSkill ? currentSkill.description : "I'm an expert in building end-to-end web applications.";

    return (
      <div className="skills" onMouseLeave={this.resetCurrentSkill.bind(this)}>
        <p className={descriptionClass}>{description}</p>
        <ul className="skills-container">{skillsTop}</ul>
        <ul className="skills-container">{skillsBottom}</ul>
      </div>
    )
  }
}
