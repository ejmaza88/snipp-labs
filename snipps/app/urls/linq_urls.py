from django.urls import path

from app import views
from app.utils import linq_api_path


"""
LINQS URLS
"""
linq_urlpatterns = [
    path('', views.home, name='home'),

    # Linqs main page
    path('linqs/', views.linqs, name='linqs'),

    # Categories API
    linq_api_path('add_category', views.add_category, name='add-category'),
    linq_api_path('get_category_linqs', views.category_linqs, name='get-category-linqs'),
    linq_api_path('delete_category', views.archive_category, name='archive-category'),

    # Linqs API
    linq_api_path('add', views.add_linq, name='add-linq'),
    linq_api_path('delete_linq', views.archive_linq, name='archive-linq'),
    linq_api_path('search', views.search_linq, name='search-linq'),
    linq_api_path('update', views.update_linq, name='update-linq'),
]
