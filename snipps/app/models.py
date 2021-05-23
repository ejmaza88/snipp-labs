from django.db import models


# Base Models
class ArchiveModelVisibleManager(models.Manager):
    def get_queryset(self):
        return super(ArchiveModelVisibleManager, self).get_queryset().filter(archived=False)


class ArchiveModelHiddenManager(models.Manager):
    def get_queryset(self):
        return super(ArchiveModelHiddenManager, self).get_queryset().filter(archived=True)


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
    name = models.CharField(max_length=50)
    new_item = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        """Return a human-readable string representing a record"""
        return f'{self.name} ({self.id})'


# class Linq(ArchiveModel):
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     label = models.CharField(max_length=50)
#     url = models.TextField(blank=True, null=True)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     last_modified = models.DateTimeField(auto_now=True)
#
#     class Meta:
#         verbose_name = 'Linq'
#         ordering = ['-timestamp']
#
#     def __str__(self):
#         """Return a human-readable string representing a record"""
#         return f'{self.category} - {self.label} ({self.id})'
