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
    return ''.join(secrets.choice(f'{string.ascii_letters}{string.digits}') for _ in range(20))


class User(AbstractUser):
    key = models.CharField(max_length=20, db_index=True, default=_key_generator)

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

    timestamp = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

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
    name = models.CharField(max_length=50)

    timestamp = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

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
    url = models.CharField(max_length=250)

    timestamp = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Linq Url'
        verbose_name_plural = 'Linq Urls'
        ordering = ['-timestamp']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.label} - ({self.id})'
