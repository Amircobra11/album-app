import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AlbumList from './components/AlbumList';
import Album from './components/Album';
import ArtistList from './components/ArtistList';
import ArtistDetail from './components/ArtistDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="container">
          <Routes>
            <Route path="/" element={
              <CSSTransition
                classNames="page-transition"
                timeout={300}
              >
                <Home />
              </CSSTransition>
            } />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<Album />} />
            <Route path="/artists" element={<ArtistList />} />
            <Route path="/artists/:id" element={<ArtistDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;