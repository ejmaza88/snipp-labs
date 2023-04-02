from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    User,
    Category,
    LinqLabel,
    LinqUrl,
    SnippetCategory,
    SnippetLabel,
    Snippet,
)

# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'key', 'first_name', 'last_name']
    readonly_fields = ("key",)
    fieldsets = UserAdmin.fieldsets + (
        ('Unique Key', {'fields': ['key']}),
    )


class ArchivedModelAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        # Force admin to display all objects including archived
        qs = self.model.all_objs.get_queryset()
        ordering = self.get_ordering(request)
        if ordering:
            qs = qs.order_by(*ordering)
        return qs

    def get_list_display(self, request):
        return list(self.list_display) + ['archived']


@admin.register(Category)
class CategoryAdmin(ArchivedModelAdmin):
    list_display = ('name', 'new_item',)
    search_fields = ('name',)


@admin.register(LinqLabel)
class LinqLabelAdmin(ArchivedModelAdmin):
    list_display = ('category', 'name',)
    search_fields = ('category', 'name',)


@admin.register(LinqUrl)
class LinqUrlAdmin(ArchivedModelAdmin):
    list_display = ('label', 'url',)
    search_fields = ('label', 'url',)


@admin.register(SnippetCategory)
class SnippetCategoryAdmin(ArchivedModelAdmin):
    list_display = ('name', 'new_item',)
    search_fields = ('name',)


@admin.register(SnippetLabel)
class SnippetLabelAdmin(ArchivedModelAdmin):
    list_display = ('category', 'name',)
    search_fields = ('category', 'name',)


@admin.register(Snippet)
class SnippetAdmin(ArchivedModelAdmin):
    list_display = ("id",)
    search_fields = ("id",)
