from django.urls import path

from app import views


"""
SNIPPETS URLS
"""
snippet_urlpatterns = [
    # Snippets
    path('snippets/', views.snippets, name='snippets'),

    # Snippets API
]
