from django.urls import path

from . import views

app_name = 'app'


"""
LINQS URLS
"""
urlpatterns = [
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
]


"""
SNIPPETS URLS
"""
urlpatterns = urlpatterns + [
    # Snippets
    path('snippets/', views.snippets, name='snippets'),

    # Snippets API
]
