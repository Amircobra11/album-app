import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Music, Filter, Search } from 'lucide-react';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await api.getAlbums();
        setAlbums(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch albums");
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'artist') {
      return a.artist_name.localeCompare(b.artist_name);
    } else if (sortBy === 'newest') {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (sortBy === 'oldest') {
      return new Date(a.release_date) - new Date(b.release_date);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="loading-spinner">
        Loading albums...
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="album-list-page fade-in">
      <div className="page-header">
        <h1>Albums</h1>
        <div className="filter-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search albums or artists..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-control">
            <Filter size={18} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {sortedAlbums.length === 0 ? (
        <div className="no-results">
          <Music size={48} />
          <p>No albums found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="album-grid">
          {sortedAlbums.map((album, index) => (
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
                      <Music size={32} />
                    </div>
                  </div>
                </div>
                <div className="album-card-info">
                  <h3>{album.title}</h3>
                  <p>{album.artist_name}</p>
                  <small>{new Date(album.release_date).getFullYear()}</small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumList;