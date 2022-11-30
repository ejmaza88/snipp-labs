import json

from django.contrib.auth.decorators import login_required
# from django.db import connection
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST, require_GET
from rest_framework import status
from rest_framework.decorators import api_view

from app.models import Category, LinqLabel, LinqUrl
from app.serializers import CategorySerializer, LinqLabelSerializer


@login_required
def home(request):
    return redirect('app:linqs')


@login_required
def linqs(request):
    """
    Renders the initial page with the default selected values
    """

    categories = Category.objects.filter(user=request.user)

    context = {
        'init_js_data': {
            'categories': CategorySerializer(categories, many=True).data
        }
    }

    if categories:
        linq_list = LinqLabel.objects.filter(category_id=categories[0].id).select_related('category').prefetch_related('linqurl_set')
        context['init_js_data'].update({
            'initSelectedLinqs': LinqLabelSerializer(instance=linq_list, many=True).data  # 'instance=' is optional
        })

    # for reference, =)
    # selected = categories.filter(pk=categories[0].id).prefetch_related('linqlabel_set', 'linqlabel_set__linqurl_set').get()

    return render(request, 'app/linqs.html', context)


# API VIEWS
@login_required
@api_view(['POST'])
def add_category(request):
    """
    Add a new category
    """

    category_count = Category.objects.count()
    data = {'user': request.user.id, **request.data}

    # only when creating a category for the firs time
    if category_count == 0:
        data.update({'new_item': False})

    category_serializer = CategorySerializer(data=data)

    if category_serializer.is_valid():
        category_serializer.save()
        context = {'success': True, 'obj': category_serializer.data, 'status': status.HTTP_201_CREATED}
        return JsonResponse(context)

    context = {'success': True, 'obj': category_serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
    return JsonResponse(context)


@login_required
@require_POST
def archive_category(request):
    """
    Archives a category
    """

    data = json.loads(request.body)
    Category.objects.filter(pk=data.get('category_id')).update(archived=True)

    return JsonResponse({'success': True})


@login_required
@require_GET
def category_linqs(request):
    """
    Return all category linQs when the category name is clicked
    """

    data = request.GET
    category_id = data.get('category_id')
    is_new = data.get('is_new')  # has the category name been clicked yet?

    linq_list = LinqLabel.objects.filter(category_id=category_id).select_related('category').prefetch_related('linqurl_set')

    if is_new == 'true':
        Category.objects.filter(pk=category_id).update(new_item=False)

    return JsonResponse({
        'categoryLinqs': LinqLabelSerializer(instance=linq_list, many=True).data,
        'success': True
    })


@login_required
@require_POST
def add_linq(request):
    """
    Add a new LinQ, creates Label and URLs
    """

    data = json.loads(request.body)
    cat_id = data.get('category_id')
    label = data.get('label')
    url_list = data.get('url').split(',')

    instance = LinqLabel.objects.create(category_id=cat_id, name=label)

    url_list_objs = (
        LinqUrl(label=instance, url=x) for x in url_list
    )

    LinqUrl.objects.bulk_create(objs=(url_obj for url_obj in url_list_objs))

    context = {
        'success': True,
        'newLinq': LinqLabelSerializer(instance).data
    }

    return JsonResponse(context)


@login_required
@require_POST
def archive_linq(request):
    """
    Archive a new LinQ
    """

    data = json.loads(request.body)
    LinqLabel.objects.filter(pk=data.get('linq_id')).update(archived=True)

    return JsonResponse({'success': True})


@login_required
@require_GET
def search_linq(request):
    """
    Search LinQs given a search term
    """

    term = request.GET.get("search_term")
    linq_list = LinqLabel.objects.filter(name__icontains=term).select_related('category').prefetch_related('linqurl_set')

    return JsonResponse({
        "success": True,
        "searchedLinqs": LinqLabelSerializer(instance=linq_list, many=True).data,
    })


@login_required
@require_POST
def update_linq(request):
    """
    Update LinQ label or urls (add/remove)
    """

    data = json.loads(request.body)
    # LinqLabel.objects.filter(pk=data.get('linq_id')).update(archived=True)
    print(data)

    return JsonResponse({'success': True, "hello": "world"})
