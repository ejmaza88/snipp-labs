from django.urls import path

from . import views

app_name = 'app'


urlpatterns = [
    path('', views.home, name='home'),

    # Linqs
    path('linqs/', views.linqs, name='linqs'),
    path('api/linqs/add_category', views.add_category, name='add-category'),
    # Linqs API

    # Snippets
    path('snippets/', views.snippets, name='snippets'),
    # Snippets API
]