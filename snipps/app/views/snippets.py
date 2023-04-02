import json
from pathlib import Path

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.decorators import api_view

from app.models import SnippetCategory, SnippetLabel
from app.serializers import SnippetCategorySerializer, SnippetLabelSerializer
from app.utils import SuccessJsonResponse


@login_required()
def snippets(request):

    categories = SnippetCategory.objects.filter(user=request.user)

    context = {
        'init_js_data': {
            'categories': SnippetCategorySerializer(categories, many=True).data
        }
    }

    if categories:
        label_list = SnippetLabel.objects.filter(category_id=categories[0].id).select_related('category').prefetch_related('snippet')

        context['init_js_data'].update({
            'initSelectedSnippet': SnippetLabelSerializer(instance=label_list, many=True).data
        })

    return render(request, 'app/snippets.html', context)


# API VIEWS
@login_required
@api_view(['POST'])
def save_update_snippet(request):
    """
    Add a new category
    """

    # print(request.data["snippet_value"])

    with open(Path().joinpath(settings.BASE_DIR, "app", "models.py")) as f:
        tt = f.read()

    print(json.dumps(tt))
    context = {"codeSnippet": json.dumps(tt)}
    return SuccessJsonResponse(context)
