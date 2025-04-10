import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.getArtists();
        setArtists(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch artists");
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <div>Loading artists...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="artist-list">
      <h1>Artists</h1>
      <div className="artist-grid">
        {artists.map(artist => (
          <div key={artist.id} className="artist-card">
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;