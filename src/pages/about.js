import React from 'react';

import heroLargeImg from '../images/paul-hero-large.jpg';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeroImage() {
    return window.innerWidth <= 510 ?
      null :
      (
        <div className="about__div--hero">
          <img className="about__img--hero" src={heroLargeImg} />
        </div>
      )
  }

  render() {
    return (
      <div>
        {this.renderHeroImage()}
        <div className="about__div--container">
          <p>{`Hello, I'm Paul. I'm a Full Stack Developer from Austin, Texas. I've worked on everything from implementing rich user
          interfaces to database management. I have a strong interest in build (and architecting)
          data-intensive web applications. I love what I do and I'm always looking for
          new opportunities to learn.`}</p>

          <h2 className="about__h2--title-section">{"What I've Worked On"}</h2>

          <strong>Front End Development</strong>
          <p>{`I've worked on projects big and small using frameworks
          like backbone.js and react.js to managed the state of data-intensive UIs. I also have experience
          using css-preprocessors like Less and Sass to turn Photoshop mockups into working prototypes. I'm also
          skilled in configuring frontend production builds using tools like Grunt and Webpack.`}
          </p>

          <strong>Back End Development</strong>
          <p>{` I have a lot of experience building production ready RESTful
          APIs. I've built services for notification scheduling, payment processing
          (using stripe) and image processing. I'm also skilled in configuring applications to run in
          Docker containers.`}
          </p>

          <strong>Project Management</strong>
          <p>{`Every project I've worked on I've been heavily involved in contributing
          to each stage in a project's timeline, from planning to development. I've been involved in talking
          to clients about requirements. I've contributed to designing and planning quality software. I have a
          ton of experience doing code reviews.`}
          </p>

          <strong>Training</strong>
          <p>{`I've trained many junior developers throughout my career and there is nothing I enjoy more
          than helping people see their potential. I have a strong passion in helping the people I work with reach
          their goals.`}
          </p>

          <h2 className="about__h2--title-section">{`What's Next`}</h2>
          <p>{`I want to team up with really smart, really passionate, developers and build awesome things!`}</p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
