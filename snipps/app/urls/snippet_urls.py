from django.urls import path

from app import views
from app.utils import snippet_api_path


"""
SNIPPETS URLS
"""
snippet_urlpatterns = [
    # Snippets
    path('snippets/', views.snippets, name='snippets'),

    # Snippets API
    snippet_api_path('add_category', views.add_snippet_category, name='add-snippet-category'),
    snippet_api_path('delete_category', views.archive_snippet_category, name='archive-snippet'),
    snippet_api_path('get_category_snippets', views.category_snippets, name='get-category-snippets'),
    snippet_api_path('add_label', views.add_snippet_label, name='add-snippets-label'),
    snippet_api_path('delete_label', views.archive_label, name='archive-label'),
    snippet_api_path('update_snippet', views.update_snippet, name='update-snippet'),
]
