import secrets
import string

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


# Base Models
class ArchiveModelVisibleManager(models.Manager):
    def get_queryset(self):
        return super(ArchiveModelVisibleManager, self).get_queryset().filter(archived=False)


class ArchiveModelHiddenManager(models.Manager):
    def get_queryset(self):
        return super(ArchiveModelHiddenManager, self).get_queryset().filter(archived=True)


# Custom User Model
def _key_generator():
    """Return a unique key"""
    return ''.join(secrets.choice(f'{string.ascii_letters}{string.digits}') for _ in range(64))


class User(AbstractUser):
    key = models.CharField(max_length=64, db_index=True, default=_key_generator, editable=False)

    def __str__(self):
        """Return a human-readable string representing a User record"""
        return self.get_full_name()

    class Meta:
        ordering = ['first_name']


# Main Models
class ArchiveModel(models.Model):
    """
    For models that will never be deleted, use an archive flag to hide them from normal operations.
    """

    archived = models.BooleanField(default=False)
    added = models.DateTimeField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # Manager objs
    objects = ArchiveModelVisibleManager()
    archived_objs = ArchiveModelHiddenManager()
    all_objs = models.Manager()

    class Meta:
        abstract = True


class Category(ArchiveModel):
    """
    Category Record
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    new_item = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.name} ({self.id})'


class LinqLabel(ArchiveModel):
    """
    Linq Label Record
    """

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Linq Label'
        verbose_name_plural = 'Linq Labels'
        ordering = ['-timestamp']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.category} - {self.name} ({self.id})'


class LinqUrl(ArchiveModel):
    """
    Linq URL Record
    """

    label = models.ForeignKey(LinqLabel, on_delete=models.CASCADE)
    url = models.TextField()

    class Meta:
        verbose_name = 'Linq Url'
        verbose_name_plural = 'Linq Urls'
        ordering = ['-timestamp']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.label} - ({self.id})'


class SnippetCategory(ArchiveModel):
    """
    SnippetCategory Record
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="snippet_categories")
    name = models.CharField(max_length=50)
    new_item = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Snippet Category'
        verbose_name_plural = 'Snippet Categories'
        ordering = ['name']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.name} ({self.id})'


class Snippet(ArchiveModel):
    """
    Snippet Record
    """
    value = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = 'Snippet'
        verbose_name_plural = 'Snippets'
        ordering = ['-timestamp']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'(Snippet - {self.id})'


class SnippetLabel(ArchiveModel):
    """
    Snippet Label Record
    """

    category = models.ForeignKey(SnippetCategory, on_delete=models.CASCADE, related_name="labels")
    snippet = models.OneToOneField(Snippet, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Snippet Label'
        verbose_name_plural = 'Snippet Labels'
        ordering = ['-timestamp']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.category} - {self.name} ({self.id})'

