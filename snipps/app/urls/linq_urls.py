from django.urls import path

from app import views


"""
LINQS URLS
"""
linq_urlpatterns = [
    path('', views.home, name='home'),

    # Linqs main page
    path('linqs/', views.linqs, name='linqs'),

    # Categories API
    path('api/linqs/add_category', views.add_category, name='add-category'),
    path('api/linqs/get_category_linqs', views.category_linqs, name='get-category-linqs'),
    path('api/linqs/delete_category', views.archive_category, name='archive-category'),

    # Linqs API
    path('api/linqs/add', views.add_linq, name='add-linq'),
    path('api/linqs/delete_linq', views.archive_linq, name='archive-linq'),
    path('api/linqs/search', views.search_linq, name='search-linq'),
    path('api/linqs/update', views.update_linq, name='update-linq'),
]
