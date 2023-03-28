from django.urls import path

from app import views


"""
SNIPPETS URLS
"""
snippet_urlpatterns = [
    # Snippets
    path('snippets/', views.snippets, name='snippets'),

    # Snippets API
    path('api/snippets/save-update', views.save_update_snippet, name='save-update-snippet'),
]
