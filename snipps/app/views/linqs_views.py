from django.contrib.auth.decorators import login_required
# from django.db import connection
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view

from app.models import Category, LinqLabel, LinqUrl
from app.caches.linqs_cache import LinqsCache
from app.serializers import CategorySerializer, LinqLabelSerializer
from app.utils import SuccessJsonResponse


@login_required
def home(request):
    return redirect('app:linqs')


@login_required
def linqs(request):
    """
    Renders the initial page with the default selected values
    """

    categories = Category.objects.filter(user=request.user)
    initial_category_id = categories[0].id

    context = {
        'init_js_data': {
            'categories': CategorySerializer(categories, many=True).data
        }
    }

    if categories:
        serialized_linq_list = LinqsCache(initial_category_id).serialized_objects()

        context['init_js_data'].update({
            'initSelectedLinqs': serialized_linq_list
        })

    # for reference, =)
    # selected = categories.filter(pk=categories[0].id).prefetch_related('linqlabel_set', 'linqlabel_set__linqurl_set').get()
    # 'initSelectedLinqs': LinqLabelSerializer(instance=linq_list_qs, many=True).data  # 'instance=' is optional

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
        context = {'obj': category_serializer.data, 'status': status.HTTP_201_CREATED}
        return SuccessJsonResponse(context)

    context = {'obj': category_serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
    return JsonResponse(context)


@login_required
@api_view(['POST'])
def archive_category(request):
    """
    Archives a category
    """

    data = request.data
    Category.objects.filter(pk=data.get('category_id')).update(archived=True)

    return SuccessJsonResponse()


@login_required
@api_view(['GET'])
def category_linqs(request):
    """
    Return all category linQs when the category name is clicked
    """

    # print(flush=True)

    data = request.GET
    category_id = data.get('category_id')
    is_new = data.get('is_new')  # has the category name been clicked yet?

    serialized_linq_list = LinqsCache(category_id).serialized_objects()

    if is_new == 'true':
        Category.objects.filter(pk=category_id).update(new_item=False)

    return SuccessJsonResponse({
        'categoryLinqs': serialized_linq_list,
    })


@login_required
@api_view(['POST'])
def add_linq(request):
    """
    Add a new LinQ, creates Label and URLs
    """

    data = request.data
    cat_id = data.get('category_id')
    label = data.get('label')
    url_list = data.get('url').split(',')

    instance = LinqLabel.objects.create(category_id=cat_id, name=label)

    url_list_objs = (
        LinqUrl(label=instance, url=x) for x in url_list
    )

    LinqUrl.objects.bulk_create(objs=(url_obj for url_obj in url_list_objs))

    LinqsCache(cat_id).set_needs_caching()

    return SuccessJsonResponse({
        'newLinq': LinqLabelSerializer(instance).data,
    })


@login_required
@api_view(['POST'])
def archive_linq(request):
    """
    Archive a new LinQ
    """

    data = request.data
    LinqLabel.objects.filter(pk=data.get('linq_id')).update(archived=True)

    LinqsCache(data.get("category_id")).set_needs_caching()

    return SuccessJsonResponse()


@login_required
@api_view(['GET'])
def search_linq(request):
    """
    Search LinQs given a search term
    """

    term = request.GET.get("search_term")
    linq_list = LinqLabel.objects.filter(name__icontains=term).select_related('category').prefetch_related('linqurl_set')

    return SuccessJsonResponse({
        "searchedLinqs": LinqLabelSerializer(instance=linq_list, many=True).data,
    })


@login_required
@api_view(['POST'])
def update_linq(request):
    """
    Update LinQ label or urls (add/remove)
    """

    data = request.data

    linq = LinqLabel.objects.get(pk=data["linq_id"])
    linq.name = data["linq_name"]
    linq.save()

    # create all the new urls
    LinqUrl.objects.bulk_create(
        (LinqUrl(
            label_id=data["linq_id"],
            url=url["url"]
        ) for url in data["urls"] if not url.get("id"))
    )

    # archive linq urls
    LinqUrl.objects.filter(id__in=data.get("archived_id_list")).update(archived=True)

    linq.refresh_from_db()

    LinqsCache(linq.category.id).set_needs_caching()

    return SuccessJsonResponse({
        "linq": LinqLabelSerializer(linq).data,
    })
