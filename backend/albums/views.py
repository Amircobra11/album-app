from rest_framework import viewsets
from .models import Artist, Album, Song
from .serializers import ArtistSerializer, AlbumSerializer, SongSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_queryset(self):
        queryset = Album.objects.all()
        artist_id = self.request.query_params.get('artist_id')
        if artist_id:
            queryset = queryset.filter(artist_id=artist_id)
        return queryset


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def get_queryset(self):
        queryset = Song.objects.all()
        album_id = self.request.query_params.get('album_id')
        if album_id:
            queryset = queryset.filter(album_id=album_id)
        return queryset