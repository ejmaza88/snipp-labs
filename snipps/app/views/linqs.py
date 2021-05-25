import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.http import require_POST, require_GET

from app.models import Category
from app.serializers import CategorySerializer


@login_required
def home(request):
    return redirect('app:linqs')


@login_required
def linqs(request):
    categories = Category.objects.all()

    context = {
        'init_js_data': {
            'categories': CategorySerializer(categories, many=True).data,
            'addCategoryAPI': reverse('app:add-category'),
            'getCategoryLinqsAPI': reverse('app:get-category-linqs'),
            'deleteCategoryAPI': reverse('app:archive-category')
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
        Return all category linqs when the name is clicked
    """

    data = request.GET

    if data.get('is_new'):
        Category.objects.filter(pk=data.get('category_id')).update(new_item=False)

    return JsonResponse({'data': 'all linqs'})


