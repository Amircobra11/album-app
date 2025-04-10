from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='artists/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Album(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, related_name='albums', on_delete=models.CASCADE)
    cover_image = models.ImageField(upload_to='albums/')
    release_date = models.DateField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.artist.name}"


class Song(models.Model):
    title = models.CharField(max_length=200)
    album = models.ForeignKey(Album, related_name='songs', on_delete=models.CASCADE)
    track_number = models.PositiveIntegerField()
    duration = models.DurationField()
    audio_file = models.FileField(upload_to='songs/')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['track_number']

    def __str__(self):
        return f"{self.track_number}. {self.title}"