import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Player from './Player';
import { Play, Music, Clock, Disc } from 'lucide-react';

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const response = await api.getAlbum(id);
        setAlbum(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch album");
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const playSong = (song) => {
    if (!currentSong || currentSong.id !== song.id) {
      setPlayerKey(prev => prev + 1);
      setCurrentSong(song);
    } else {
      setCurrentSong(song);
    }
  };

  const handlePlayNext = () => {
    if (!album || !currentSong) return;

    const currentIndex = album.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex < album.songs.length - 1) {
      setPlayerKey(prev => prev + 1);
      setCurrentSong(album.songs[currentIndex + 1]);
    }
  };

  const handlePlayPrevious = () => {
    if (!album || !currentSong) return;

    const currentIndex = album.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex > 0) {
      setPlayerKey(prev => prev + 1);
      setCurrentSong(album.songs[currentIndex - 1]);
    }
  };

  const handleSongEnd = () => {
    handlePlayNext();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        Loading album...
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;
  if (!album) return <div className="not-found">Album not found</div>;

  return (
    <div className="album-detail fade-in">
      <div className="album-header">
        <div className="album-cover-container">
          <img
            src={album.cover_image}
            alt={album.title}
            className="album-cover-large"
          />
          <div className="album-cover-overlay">
            <button
              className="play-all-button"
              onClick={() => album.songs.length > 0 && playSong(album.songs[0])}
            >
              <Play size={40} />
              <span>Play All</span>
            </button>
          </div>
        </div>
        <div className="album-info">
          <div className="album-type">Album</div>
          <h1>{album.title}</h1>
          <h2>{album.artist_name}</h2>
          <div className="album-meta">
            <span className="release-date">
              <Disc size={16} />
              {new Date(album.release_date).toLocaleDateString()}
            </span>
            <span className="song-count">
              <Music size={16} />
              {album.songs.length} songs
            </span>
            <span className="album-duration">
              <Clock size={16} />
              {calculateTotalDuration(album.songs)}
            </span>
          </div>
          <p className="album-description">{album.description}</p>
        </div>
      </div>

      <div className="song-list">
        <h2>Tracks</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {album.songs.map(song => (
              <tr
                key={song.id}
                className={`song-item ${currentSong && currentSong.id === song.id ? 'playing' : ''}`}
                onClick={() => playSong(song)}
              >
                <td>{song.track_number}</td>
                <td>{song.title}</td>
                <td>{formatDuration(song.duration)}</td>
                <td>
                  <button
                    className="play-track-btn"
                    aria-label={currentSong && currentSong.id === song.id ? 'Now playing' : `Play ${song.title}`}
                  >
                    {currentSong && currentSong.id === song.id ? 'Now Playing' : 'Play'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentSong && (
        <Player
          key={playerKey}
          song={currentSong}
          onEnded={handleSongEnd}
          playlist={album.songs}
          onPlayNext={handlePlayNext}
          onPlayPrevious={handlePlayPrevious}
        />
      )}
    </div>
  );
};

const formatDuration = (durationString) => {
  const parts = durationString.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const calculateTotalDuration = (songs) => {
  if (!songs || !songs.length) return "0:00";

  let totalSeconds = 0;

  songs.forEach(song => {
    const parts = song.duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);

    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${seconds}s`;
};

export default Album;