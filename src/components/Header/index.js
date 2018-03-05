import React from 'react';
import Link from 'gatsby-link';

import menuIcon from '../../images/menu.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      isMobile: false
    };
  }

  componentDidMount() {
    this.setState({ isMobile: window && window.innerWidth <= 510 })
    window.addEventListener("resize", this.resetMenuState.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resetMenuState.bind(this));
  }

  resetMenuState() {
    this.setState({
      menuOpen: false,
      isMobile: window && window.innerWidth <= 510
    });
  }

  getMenuStyle() {
    return this.state.menuOpen ? {display: 'inline-block'} : {display: 'none'};
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const menuStyle = this.state.isMobile ? this.getMenuStyle() : {};
    return (
      <header className="header">
        <div className="header__div--container">
          <h1 className="header__h1--title">
           <Link to="/">P.</Link>
          </h1>
          <img className="header__img--mobile-menu" src={menuIcon} onClick={this.toggleMenu.bind(this)} />
          <nav className="header__nav" style={menuStyle}>
            <ul>
              <li onClick={this.toggleMenu.bind(this)}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={this.toggleMenu.bind(this)}>
                <Link to="/projects">Projects</Link>
              </li>
              <li onClick={this.toggleMenu.bind(this)}>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
