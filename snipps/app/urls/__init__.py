from app.urls.linq_urls import linq_urlpatterns
from app.urls.snippet_urls import snippet_urlpatterns


app_name = 'app'


urlpatterns = [
    *linq_urlpatterns,
    *snippet_urlpatterns,
]
