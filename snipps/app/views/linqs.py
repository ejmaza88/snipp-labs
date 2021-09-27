import json

from django.contrib.auth.decorators import login_required
# from django.db import connection
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST, require_GET

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

    categories = Category.objects.all()
    linq_list = LinqLabel.objects.filter(category_id=categories[0].id).select_related('category').prefetch_related('linqurl_set')

    # for reference, lol
    # selected = categories.filter(pk=categories[0].id).prefetch_related('linqlabel_set', 'linqlabel_set__linqurl_set').get()

    context = {
        'init_js_data': {
            'categories': CategorySerializer(categories, many=True).data,
            'initSelectedLinqs': LinqLabelSerializer(instance=linq_list, many=True).data  # 'instance=' is optional
        }
    }

    return render(request, 'app/linqs.html', context)


# API VIEWS
@login_required
@require_POST
def add_category(request):
    """
        Add a new category
    """
    data = json.loads(request.body)
    instance = Category.objects.create(name=data.get('name'), new_item=data.get('new_item'))
    context = {
        'success': True,
        'obj': CategorySerializer(instance).data
    }
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
        Return all category linqs when the category name is clicked
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
        Add a new Linq, creates Label and URLs
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
        'newObj': LinqLabelSerializer(instance).data
    }

    return JsonResponse(context)


@login_required
@require_POST
def archive_linq(request):
    """
        Archive a new Linq
    """

    data = json.loads(request.body)
    LinqLabel.objects.filter(pk=data.get('linq_id')).update(archived=True)

    return JsonResponse({'success': True})

