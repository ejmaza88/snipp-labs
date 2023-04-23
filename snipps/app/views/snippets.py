from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status

from app.models import SnippetCategory, SnippetLabel, Snippet
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
            'initSelectedSnippets': SnippetLabelSerializer(instance=label_list, many=True).data
        })

    return render(request, 'app/snippets.html', context)


# API VIEWS
@login_required
@api_view(['POST'])
def add_snippet_category(request):
    """
    Add a new category
    """

    category_count = SnippetCategory.objects.count()
    data = {'user': request.user.id, **request.data}

    # only when creating a category for the firs time
    if category_count == 0:
        data.update({'new_item': False})

    category_serializer = SnippetCategorySerializer(data=data)

    if category_serializer.is_valid():
        category_serializer.save()
        context = {'obj': category_serializer.data, 'status': status.HTTP_201_CREATED}
        return SuccessJsonResponse(context)

    context = {'obj': category_serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
    return JsonResponse(context)


@login_required
@api_view(['POST'])
def archive_snippet_category(request):
    """
    Archives a category
    """

    data = request.data
    SnippetCategory.objects.filter(pk=data.get('category_id')).update(archived=True)

    return SuccessJsonResponse()


@login_required
@api_view(['GET'])
def category_snippets(request):
    """
    Return all category Snippets/Labels when the category name is clicked
    """

    # print(flush=True)

    data = request.GET
    category_id = data.get('category_id')
    is_new = data.get('is_new')  # has the category name been clicked yet?

    snippets_list = SnippetLabel.objects.filter(category_id=category_id).select_related('category').prefetch_related('snippet')

    if is_new == 'true':
        SnippetCategory.objects.filter(pk=category_id).update(new_item=False)

    return SuccessJsonResponse({
        'categoryLabels': SnippetLabelSerializer(instance=snippets_list, many=True).data,
    })


@login_required
@api_view(['POST'])
def add_snippet_label(request):
    """
    Add a new category
    """

    snippet = Snippet.objects.create(value='"Add snippet here"')

    data = {
        'user': request.user.id,
        "name": request.data.get("name"),
        "category": int(request.data.get("category_id")),
        "snippet": snippet.id
    }

    category_serializer = SnippetLabelSerializer(data=data)

    if category_serializer.is_valid():
        category_serializer.save()
        context = {'obj': category_serializer.data, 'status': status.HTTP_201_CREATED}
        return SuccessJsonResponse(context)

    context = {'obj': category_serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
    return JsonResponse(context)


@login_required
@api_view(['POST'])
def archive_label(request):
    """
    Archive a new LinQ
    """

    data = request.data
    SnippetLabel.objects.filter(pk=data.get('label_id')).update(archived=True)

    return SuccessJsonResponse()


# API VIEWS
@login_required
@api_view(['PUT'])
def update_snippet(request):
    """
    Update Snippet

    Will update the snippet code or the code type, but no both at the same time
    """

    snippet_id = request.data.get("snippet_id")
    snippet_value = request.data.get("snippet_value")
    snippet_type = request.data.get("snippet_type")

    Snippet.objects.filter(pk=snippet_id).update(value=snippet_value, type=snippet_type)

    return SuccessJsonResponse()
