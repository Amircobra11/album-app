from rest_framework import serializers
from .models import Artist, Album, Song


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'track_number', 'duration', 'audio_file']


class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)
    artist_name = serializers.ReadOnlyField(source='artist.name')

    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'artist_name', 'cover_image',
                  'release_date', 'description', 'songs']


class ArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'image', 'albums']