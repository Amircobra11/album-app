import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Music } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="main-navigation">
      <div className="nav-logo">
        <Link to="/">
          <Music size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Music Album App
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Albums</Link></li>
        <li><Link to="/artists">Artists</Link></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  );
};

export default Navigation;