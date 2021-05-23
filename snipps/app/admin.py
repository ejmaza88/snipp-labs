from django.contrib import admin

from .models import Category

# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'new_item')
    search_fields = ('name',)


# @admin.register(Linq)
# class StuffAdmin(admin.ModelAdmin):
#     list_display = ('category', 'label', 'url')
#     search_fields = ('category', 'label')
