from django.contrib import admin

from .models import Category

# Register your models here.


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
    list_display = ('name', 'new_item')
    search_fields = ('name',)


# @admin.register(Linq)
# class StuffAdmin(admin.ModelAdmin):
#     list_display = ('category', 'label', 'url')
#     search_fields = ('category', 'label')
