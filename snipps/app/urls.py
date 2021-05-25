from django.urls import path

from . import views

app_name = 'app'


"""
LINQS URLS
"""
urlpatterns = [
    path('', views.home, name='home'),

    # Linqs
    path('linqs/', views.linqs, name='linqs'),

    # Linqs API
    path('api/linqs/add_category', views.add_category, name='add-category'),
    path('api/linqs/get_category_linqs', views.category_linqs, name='get-category-linqs'),
    path('api/linqs/delete_category', views.archive_category, name='archive-category'),
]


"""
SNIPPETS URLS
"""
urlpatterns = urlpatterns + [
    # Snippets
    path('snippets/', views.snippets, name='snippets'),

    # Snippets API
]
