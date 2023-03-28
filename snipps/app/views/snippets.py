from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.decorators import api_view
from app.utils import SuccessJsonResponse


@login_required()
def snippets(request):
    context = {}

    return render(request, 'app/snippets.html', context)


# API VIEWS
@login_required
@api_view(['POST'])
def save_update_snippet(request):
    """
    Add a new category
    """

    print(request.data["snippet_value"])

    context = {"codeSnippet": request.data["snippet_value"]}
    return SuccessJsonResponse(context)
