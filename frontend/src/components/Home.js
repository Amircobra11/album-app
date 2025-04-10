import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Play, Music, Disc, User, Headphones, TrendingUp } from 'lucide-react';

const Home = () => {
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const albumsResponse = await api.getAlbums();
        const albums = albumsResponse.data;

        const sortedByDate = [...albums].sort((a, b) =>
          new Date(b.release_date) - new Date(a.release_date)
        );

        setNewReleases(sortedByDate.slice(0, 6));

        const shuffled = [...albums].sort(() => 0.5 - Math.random());
        setFeaturedAlbums(shuffled.slice(0, 6));

        const artistsResponse = await api.getArtists();
        setPopularArtists(artistsResponse.data.slice(0, 6));

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch home page data");
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        Loading...
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Music</h1>
          <p>Stream unlimited albums and discover new artists</p>
          <Link to="/albums" className="browse-button">
            <Headphones size={20} />
            Browse Albums
          </Link>
        </div>
      </div>

      {/* Featured Albums Section */}
      <section className="home-section">
        <div className="section-header">
          <h2><TrendingUp size={24} /> Featured Albums</h2>
          <Link to="/albums" className="view-all-link">View All</Link>
        </div>
        <div className="album-grid">
          {featuredAlbums.map((album, index) => (
            <div
              key={album.id}
              className="album-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link to={`/albums/${album.id}`}>
                <div className="album-cover-container">
                  <img
                    src={album.cover_image}
                    alt={album.title}
                    className="album-cover"
                  />
                  <div className="album-hover-overlay">
                    <div className="play-icon">
                      <Play size={32} />
                    </div>
                  </div>
                </div>
                <div className="album-card-info">
                  <h3>{album.title}</h3>
                  <p>{album.artist_name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      <section className="home-section">
        <div className="section-header">
          <h2><Music size={24} /> New Releases</h2>
          <Link to="/albums" className="view-all-link">View All</Link>
        </div>
        <div className="album-grid">
          {newReleases.map((album, index) => (
            <div
              key={album.id}
              className="album-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link to={`/albums/${album.id}`}>
                <div className="album-cover-container">
                  <img
                    src={album.cover_image}
                    alt={album.title}
                    className="album-cover"
                  />
                  <div className="album-hover-overlay">
                    <div className="play-icon">
                      <Play size={32} />
                    </div>
                  </div>
                </div>
                <div className="album-card-info">
                  <h3>{album.title}</h3>
                  <p>{album.artist_name}</p>
                  <small>{new Date(album.release_date).toLocaleDateString()}</small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Artists Section */}
      <section className="home-section">
        <div className="section-header">
          <h2><User size={24} /> Popular Artists</h2>
          <Link to="/artists" className="view-all-link">View All</Link>
        </div>
        <div className="artist-grid">
          {popularArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="artist-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link to={`/artists/${artist.id}`}>
                <div className="artist-image-container">
                  {artist.image ? (
                    <img src={artist.image} alt={artist.name} className="artist-image" />
                  ) : (
                    <div className="artist-placeholder">
                      {artist.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3>{artist.name}</h3>
                <p className="artist-album-count">
                  <Disc size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {artist.albums ? `${artist.albums.length} albums` : 'No albums yet'}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;