from django.contrib import admin
from .models import Artist, Album, Song


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'release_date', 'created_at')
    list_filter = ('artist', 'release_date')
    search_fields = ('title', 'artist__name')


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('track_number', 'title', 'album', 'duration', 'created_at')
    list_filter = ('album',)
    search_fields = ('title', 'album__title')
