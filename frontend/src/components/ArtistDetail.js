import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { Music, User, Calendar, Disc } from 'lucide-react';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const response = await api.getArtist(id);
        setArtist(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch artist");
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        Loading artist...
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;
  if (!artist) return <div className="not-found">Artist not found</div>;

  return (
    <div className="artist-detail fade-in">
      <div className="artist-header">
        <div className="artist-image-large">
          {artist.image ? (
            <img src={artist.image} alt={artist.name} className="pulse" />
          ) : (
            <div className="artist-placeholder-large">
              <User size={64} />
            </div>
          )}
        </div>
        <div className="artist-info">
          <div className="artist-label">Artist</div>
          <h1>{artist.name}</h1>
          <div className="artist-meta">
            <span className="album-count">
              <Disc size={16} />
              {artist.albums.length} Albums
            </span>
            {artist.formed_year && (
              <span className="formed-year">
                <Calendar size={16} />
                Since {artist.formed_year}
              </span>
            )}
          </div>
          <p className="artist-bio">{artist.bio}</p>

          {artist.genres && artist.genres.length > 0 && (
            <div className="artist-genres">
              <h3>Genres</h3>
              <div className="genre-tags">
                {artist.genres.map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="artist-albums">
        <h2>Albums</h2>
        <div className="album-grid">
          {artist.albums.map(album => (
            <div key={album.id} className="album-card slide-up">
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
                  <p>{new Date(album.release_date).getFullYear()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;