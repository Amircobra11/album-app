import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = {
  // Artists
  getArtists: () => axios.get(`${API_URL}/artists/`),
  getArtist: (id) => axios.get(`${API_URL}/artists/${id}/`),

  // Albums
  getAlbums: () => axios.get(`${API_URL}/albums/`),
  getAlbum: (id) => axios.get(`${API_URL}/albums/${id}/`),
  getArtistAlbums: (artistId) => axios.get(`${API_URL}/albums/?artist_id=${artistId}`),

  // Songs
  getSongs: () => axios.get(`${API_URL}/songs/`),
  getAlbumSongs: (albumId) => axios.get(`${API_URL}/songs/?album_id=${albumId}`),
};

export default api;